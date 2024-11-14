// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-11-14
// @description  try to take over the world!
// @author       You
// @match        https://www.pearltrees.com/*

// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    let styleSheet = `
.copyBtn {
    padding:0;
    margin:0;
    font-size: 15px;
    background:rgb(0,0,0,.65);
    color:rgb(255,255,255);
    border-radius:50%;
    border-color:rgb(0,0,0,.65);
    width:20px;
    height:20px;
}
`;

    let s = document.createElement('style');
    s.type = "text/css";
    s.innerHTML = styleSheet;
    (document.head || document.documentElement).appendChild(s);

    'use strict';
    let flag = true ;
    let output = "";

    function checkParagraphCount() {
        const containerLoaded = document.querySelector('.scrap-selection-container');
        if (containerLoaded!= null && flag == true ) {
            // console.log(`Le conteneur principal est charge`);
            // observer2.disconnect();
            const container = document.querySelector('.scrap-selection-container');
            const pElements = container.querySelectorAll('p');

            if(pElements.length != 0){
                console.log("paragraphes charges")
                pElements.forEach(p => {
                    console.log(p.textContent);
                    output+=p.textContent;
                });

                const buttonContainerClass = document.getElementsByClassName('node-action-bar');

                // for(let i=0;i<buttonContainerClass.length; i++){
                //     buttonContainerClass[1].style.background = "rgb(0,0,0)";
                // }
                let buttonContainer = buttonContainerClass[1];

                buttonContainer.style.display = "inline-flex";
                buttonContainer.style.width = "auto";
                buttonContainer.style.alignItems = "flex-start";
                // buttonContainer.style.flexWrap = "nowrap";

                let btn = document.createElement("button");
                btn.innerHTML = "&#x2398;";
                btn.className = "copyBtn nodeaction";
                btn.onclick = () => {
                    // output.select();
                    // output.setSelectionRange(0, 99999); // For mobile devices

                    // Copy the text inside the text field
                    navigator.clipboard.writeText(output);
                    output = ""
                }
                buttonContainer.appendChild(btn);

                flag = false;
            }
        }
    }


    const observer2 = new MutationObserver(checkParagraphCount);
    observer2.observe(document.body, { childList: true, subtree: true });
    checkParagraphCount();

    // Fonction pour vérifier et afficher le chemin actuel
    function checkUrl() {
        var path = window.location.pathname;
        var page = path.split("/").pop();
        console.log("Page actuelle :", page);

        if(page.startsWith('item')) {
            flag = true;
        }
    }

    checkUrl();
    window.addEventListener('popstate', checkUrl);
    const pushState = history.pushState;
    const replaceState = history.replaceState;
    history.pushState = function() {
        pushState.apply(history, arguments);
        checkUrl(); // Appelle checkUrl après pushState
    };
    history.replaceState = function() {
        replaceState.apply(history, arguments);
        checkUrl(); // Appelle checkUrl après replaceState
    };

})();