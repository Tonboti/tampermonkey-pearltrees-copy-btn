// ==UserScript==
// @name         Pearltrees Copy text button
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
    var previousButtonContainer = null;
    var changePageCounter = 1;

    function checkParagraphCount() {
        const containerLoaded = document.querySelector('.scrap-selection-container');
        if (containerLoaded!= null && flag == true ) {
            // console.log(`Le conteneur principal est charge`);
            // observer2.disconnect();
            const container = document.querySelector('.scrap-selection-container');
            const pElements = container.querySelectorAll('p');

            if(pElements.length != 0){
                // console.log("paragraphes charges")
                pElements.forEach(p => {
                    // console.log(p);
                    output+=p.textContent;
                });

                var buttonContainerClass = document.getElementsByClassName('node-action-bar');

                // for(let i=0;i<buttonContainerClass.length; i++){
                    // console.log(i);
                // }
                let buttonContainer = buttonContainerClass[buttonContainerClass.length-1];

                if (previousButtonContainer!=buttonContainer){
                    buttonContainer.style.display = "inline-flex";
                    buttonContainer.style.width = "auto";
                    buttonContainer.style.alignItems = "flex-start";

                    let btn = document.createElement("button");
                    btn.innerHTML = "&#x2398;";
                    btn.className = "copyBtn nodeaction";
                    btn.onclick = () => {
                        // output.select();
                        // output.setSelectionRange(0, 99999); // For mobile devices
                        navigator.clipboard.writeText(output);
                        output = "";
                    }
                    buttonContainer.appendChild(btn);
                }
                flag = false;
                previousButtonContainer = buttonContainer;
                changePageCounter+=1;

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
        var previousPage = "";

        // console.log("Page actuelle :", page);
        output = "";

        if(page.startsWith('item') && page!= previousPage) {
            flag = true;
            previousPage = page;
            // console.log("YAY")
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