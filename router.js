// router.js

const pageTitle = "Matheus Alencastro";

// 1. Automatic Repository Prefix Detection
// This ensures the site works both on localhost and username.github.io/repo-name/
const getPathPrefix = () => {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    // If hosted on GitHub Pages (and not a custom domain root), the first part of the path is the repo name
    if (hostname.includes("github.io")) {
        // e.g., /my-repo/
        const repoName = pathname.split('/')[1];
        return repoName ? `/${repoName}` : ""; 
    }
    return "";
};

const prefix = getPathPrefix();

const routes = {
    404: {
        template: prefix + "/pages/404.html",
        title: "404 | " + pageTitle,
        description: "Page not found",
    },
    "/": {
        template: prefix + "/pages/home.html",
        title: "Home | " + pageTitle,
        description: "Personal website of Matheus Alencastro",
        css: prefix + "/css/home.css"
    },
    "/cv": {
        template: prefix + "/pages/cv.html",
        title: "CV | " + pageTitle,
        description: "Curriculum Vitae"
    },
    "/papers": {
        template: prefix + "/pages/papers.html",
        title: "Papers | " + pageTitle,
        description: "Academic Papers"
    },
    "/code": {
        template: prefix + "/pages/code.html",
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
    // 1. Get the current path (removing the repo prefix for matching)
    let path = window.location.pathname;
    if (prefix && path.startsWith(prefix)) {
        path = path.replace(prefix, "") || "/";
    }
    if (path.length == 0) path = "/";

    const route = routes[path] || routes[404];
    
    // 2. Load HTML
    try {
        const html = await fetch(route.template).then((data) => data.text());
        document.getElementById("app").innerHTML = html;
        document.title = route.title;
        
        // 3. Load CSS if specific to the page
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