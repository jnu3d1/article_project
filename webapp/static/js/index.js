async function getTagArticles(event) {
    event.preventDefault()
    let target = event.target;
    let tagId = target.dataset.tagId;
    console.log(tagId)
    let url = target.dataset.url;
    let response = await fetch(`${url}?tag_id=${tagId}`);
    if (response.ok) {
        let articles = await response.json()


        let content = document.getElementById("content");
        content.innerHTML = "";
        for (let i = 0; i < articles.length; i++) {
            let div = document.createElement("div")
            let article_title = document.createElement("h2")
            let article_content = document.createElement("p")
            article_title.innerText = articles[i].title
            article_content.innerText = articles[i].content
            div.appendChild(article_title)
            div.appendChild(article_content)
            content.appendChild(div)
        }
    }

}

async function sendSearchValue(event) {
    event.preventDefault()
    let target = event.target
    let input = target.querySelector('[name="search"]')
    console.log(input.value)

    console.log(input)

}

async function sendLike(event) {
    event.preventDefault();
    let target = event.target;
    let url = target.href;
    let response = await fetch(url);
    let response_json = await response.json();
    let count = response_json.count;
    let articleId = target.dataset.articleId;
    let span = document.getElementById(articleId);
    span.innerText = `Лайки: ${count}`;
    if (target.innerText === "Дизлайк") {
        K
        target.innerText = "Лайк";
    } else {
        target.innerText = "Дизлайк";
    }
}

async function sendLike2Comment(event) {
    event.preventDefault();
    let target = event.currentTarget;
    let url = target.href;
    let response = await fetch(url);
    let response_json = await response.json();
    let count = response_json.count;
    let commentId = target.dataset.commentId;
    let span = document.getElementById(commentId);
    span.innerText = `Лайки: ${count}`;
    if (target.innerHTML === '<img src="/static/images/Like.png" alt="Like" height="25">') {
        target.innerHTML = '<img src="/static/images/Unlike.png" height="25" alt="Unlike">';
    } else {
        target.innerHTML = '<img src="/static/images/Like.png" height="25" alt="Like">';
    }
}

function onloadFunc() {
    let tags = document.getElementsByClassName("tag");
    for (let i = 0; i < tags.length; i++) {
        tags[i].addEventListener("click", getTagArticles)
    }

    let form = document.getElementById("search_id")
    if (form) {
        form.addEventListener("submit", sendSearchValue)
    }


    let likes = document.getElementsByClassName("likes");
    for (let i = 0; i < likes.length; i++) {
        likes[i].addEventListener("click", sendLike)
    }

    let likes2 = document.getElementsByClassName("likes2comment");
    for (let i = 0; i < likes2.length; i++) {
        likes2[i].addEventListener('click', sendLike2Comment)
    }
}

window.addEventListener("load", onloadFunc)