$(document).ready(githubFinder);

function githubFinder() { 
    $('#searchUser').on('keyup', user.init);
}

let user = {
    name: '',
    baseUrl: 'https://api.github.com/users/',

    init: function(e) {
        user.name = e.target.value;
        user.profile();
        user.repos();
    },

    profile() {
        $.ajax({
            url: user.baseUrl + user.name,
            data: {
                client_id: 'bc1deef3b9614e08e453',
                client_secret: 'dcaa2f2f55507f81a37ffe0e5ad2eb238ee634f3'
            } 
        }).done(function(u){
            user.profileHtml(u);
        });
    },

    profileHtml(user) {
        $('#profile').html(`
            <div class="panel panel-default">
            <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
            </div>
            <div class="panel-body">
            <div class="row">
                <div class="col-md-3">
                    <img class="thumbnail avatar" src="${user.avatar_url}">
                    <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                </div>
                <div class="col-md-9">
                    <span class="label label-default">Public Repos: ${user.public_repos}</span>
                    <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                    <span class="label label-success">Followers: ${user.followers}</span>
                    <span class="label label-info">Following: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                    <li class="list-group-item">Company: ${user.company}</li>
                    <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                    <li class="list-group-item">Location: ${user.location}</li>
                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                    </ul>
                </div>
            </div>
            </div>
            </div>
            <h3 class="page-header">Latest Repos</h3>
            <div id="repos"></div>
        `);
    },

    repos() {
        $.ajax({
            url: user.baseUrl + user.name + '/repos',
            data:{
                client_id:'97b26d4e8ed886bd89fa',
                client_secret:'f5ebe96125addf1d85c64d0c72f810011da3401f',
                sort: 'created: asc',
                per_page: 5
            }
        }).done(function(repos){
            user.reposHtml(repos);
        });
    },

    reposHtml(repos) {
        $.each(repos, function(index, repo){
            $('#repos').append(`
                <div class="well">
                    <div class="row">
                        <div class="col-md-7">
                            <strong>${repo.name}</strong>: ${repo.description}
                        </div>
                        <div class="col-md-3">
                            <span class="label label-default">Forks: ${repo.forks_count}</span>
                            <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                            <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                        </div>
                        <div class="col-md-2">
                            <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                        </div>
                    </div>
                </div>
            `);
        });
    }
};

