# Readguage

<div style="display:flex; flex-direction:column;"><img src="https://github.com/FrederickRoman/Readgauge/blob/main/public/android-chrome-512x512.png" alt="Readgauge logo" height="320"/>
</div>

### AI-powered reading scoring app. 

#### It calculates the US school reading level of a text.

#### It uses Neuro-Flesch which is a neural version of the flesch scoring system created for this app.

#### It's private because all calculations get done in-brower and nothing gets ever sent to a server.

<div style="display:flex;">
<img src="https://github.com/FrederickRoman/Readgauge/blob/main/docs/mockups/Home_iPhone%205_SE.png" height="540" alt="Readgauge home page phone mockup"/>  
<img src="https://github.com/FrederickRoman/Readgauge/blob/main/docs/mockups/Home_Nest%20Hub.png" width="640" alt="Readgauge home page Nest Hub mockup"/>
</div>

## Live website

See [Readgauge website](https://readscale.netlify.app).

## Main libraries used in this project

- React.js (TS)
- Tensorflow 
- - TS - to run the neural network model client-side
- - Node - for model design (research models in python in [other repo](https://github.com/FrederickRoman/syllable-count-predictor); rewritten chosen model in node in this repo under [/ml](https://github.com/FrederickRoman/Readgauge/tree/main/ml))
- MUI 
- Chart.js
- moo.js - to tokenize the input text client-side.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for client development

```
yarn start
```

### Compiles and minifies for production

```
yarn build
```

### Launches the test runner in the interactive watch mode.
It runs unit tests for the main elements, and integration tests for scoring test cases. 
```
yarn test
```

### Retrains the neural network
It reruns the entire process from data cleaning trough training to evaluation of the model. 
```
node /ml/train
```
