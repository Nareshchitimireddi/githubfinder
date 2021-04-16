$(function () {
  $('#searchUser').on('keyup', function (e) {
    let username = e.target.value;

    // Make request to github

    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: '307c717723a194c3d490',
        client_secret: '0dfc5012238f8102b91c90f864f88185e0a32507'
      }
    }).done(function (user) {
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id: '307c717723a194c3d490',
          client_secret: '0dfc5012238f8102b91c90f864f88185e0a32507'
        }
      }).done(function (repos) {
        $.each(repos, function (index, repo) {
          $('#repos').append(`
    <div class="row">
    <div class="card card-body bg-light">
      <div class="col-md-7">
          <strong>${repo.name}</strong>: ${repo.description}
      </div>
      <div class="col-md-3">
          <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
          <span class="badge badge-danger">Watcher: ${repo.watchers_count}</span>
          <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
      </div>
      <div class="col-md-2">
          <a href="${repo.html_url}" target="_blank" class="btn btn-primary">Repo Page</a>
      </div>
    </div>
    </div>
  `)
        })
      });
      $('#profile').html(`
        <div class="card">
        <div class="card-header">
          ${user.name}
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <img src="${user.avatar_url}" class="img-thumbnail avatar">
              <a class="btn btn-primary btn-block" href="${user.html_url}"}>View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-danger">Public Repos: ${user.public_gists}</span>
              <span class="badge badge-success">Public Repos: ${user.public_followers}</span>
              <span class="badge badge-info">Public Repos: ${user.public_following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Websites/blog: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Members Since: ${user.created_at}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <h3 class="page-header">Latest Repos</h3>
      <div id="repos"></div>
      `)
    })
  })
})