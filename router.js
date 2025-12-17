// router.js

const pageTitle = "Matheus Alencastro";

const routes = {
    404: {
        template: "/pages/404.html",
        title: "404 | " + pageTitle,
        description: "Page not found",
    },
    "/": {
        template: "/pages/home.html",
        title: "Home | " + pageTitle,
        description: "Personal website of Matheus Alencastro",
        css: "/css/home.css"
    },
    "/cv": {
        template: "/pages/cv.html",
        title: "CV | " + pageTitle,
        description: "Curriculum Vitae"
    },
    "/papers": {
        template: "/pages/papers.html",
        title: "Papers | " + pageTitle,
        description: "Academic Papers"
    },
    "/code": {
        template: "/pages/code.html",
        title: "Code | " + pageTitle,
        description: "Code Projects"
    },
};

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    
    try {
        const html = await fetch(route.template).then((data) => data.text());
        document.getElementById("app").innerHTML = html;
        document.title = route.title;
        
        if (route.css) {
            loadCss(route.css);
        }
    } catch (error) {
        console.error("Error loading page:", error);
    }
};

function loadCss(url) {
    let link = document.getElementById("page-css");
    if (!link) {
        link = document.createElement("link");
        link.id = "page-css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }
    link.href = url;
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
