import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --red: #F94144;
        --green: #4ad66d;
    }
    * {
        touch-action: manipulation;
    }
    * {
        box-sizing: border-box;
    }
    body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    audio {
        display: none;
    }
    @media screen and (max-width: 575.98px) {
        audio {
            display: inline;
        }
        html, body {
            margin: 0;
            padding: 0;
        }
        body {
            width: 100vw;
            height: 100vh;
            display: block;
        }

        #root{
            height: 100%;
            width: 100%;
        }
    }
`;
