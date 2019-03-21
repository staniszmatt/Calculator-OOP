# Version 0.5

## Description
Version 0.5 adds in the user functionality / logic of a calculator. This version introduces the basic operations that a calculator
can complete and ties this functionality together with click events for you to interact with on the DOM.

## Getting Started
> 1. What branch do you have your latest changes on?
    - **I don't know** - talk with an instructor
    - **not master**
        - Create a pull request from most up to date branch to master (On **your** calculator repo)
        - Merge pull request to master
        - Go to Pull Latest Changes (*step 2*)
    - **master** - Go to Pull Latest Changes (*step 2*)
1. Pull Latest Changes
    - `git checkout master`
    - `git pull origin master`
    - *if you don't see your most recent code after pulling master refer to* **step 1**
1. Create the new feature branch
    - `git checkout -b version0.5`
1. Work on the scope defined <a href="https://github.com/Learning-Fuze/calculator/tree/v.5#scope">Below</a>
1. Add files to git
    - `git add .`
1. Commit files (Group files together)
    - `git commit -m "calculator v0.5 - Your Name"`
    - **Replace "Your Name" with your first and last name**
1. Send to gitHub (Push)
    - `git push origin version0.5`
1. Create pull request
    - Pull request should be made from version0.5 to **your repository's/teams** master branch


## Scope
 - Take layout from finished v0.1 and implement the following:
    - Insert a link to the following javascript files
        - jQuery's latest version
    - JS Functionality
        - Declare and define a function called, `do_math`, that takes in 3 parameters
            - **Parameters**
                - `num1` - first number used in a calculation
                - `num2` - second number used in a calculation
                - `operator` - operator that will determine what type of calcuation will be made
            - This function will be used to handle the basic calculations once two numbers and an operator have been registered
        - Add click handlers to all buttons in the DOM. When clicked a function will be called that will do the following:
            - Numbers `(0-9)` will be stored in an array, concatenating with previous numbers if appropriate,and be displayed on the DOM
            - Operators `(+, -, *, /)` will be stored in an array and be displayed on the DOM
            - Equal `(=)` will call the function that will perform the calcuation of the given expression
        - Take the value and display in the correct layout area within the DOM
            - The display of the calculation will be up to each students interpretation of how a calculator should look. **If you need ideas
            look at your calculator on your phone.**

## Example

#### <a href="http://Learning-Fuze.github.io/calculator/" target="_blank">View Demo</a>

#### <a href="https://docs.google.com/spreadsheets/u/1/d/1HRpRqdyQrax5vgwrVatcOxSxly6GHXXfZuzc0lb9Tfg/pubhtml#" target="_blank">Calculator Testing Sheet</a>

Try sparkles later: **
<svg width="100" height="100" viewBox="0 0 100 100">
        <symbol id="twinkle" viewBox="0 0 100 100">
          <g class="group" opacity="0.8">
            <g class="large">
              <path id="large" d="M41.25,40 L42.5,10 L43.75,40 L45, 41.25 L75,42.5 L45,43.75
                        L43.75,45 L42.5,75 L41.25,45 L40,43.75 L10,42.5 L40,41.25z " fill="white" />
            </g>
            <g class="large-2" transform="rotate(45)">
              <use xlink:href="#large" />
            </g>
            <g class="small">
              <path id="small" d="M41.25,40 L42.5,25 L43.75,40 L45,41.25 L60,42.5 L45,43.75
                              L43.75,45 L42.5,60 L41.25,45 L40,43.75 L25,42.5 L40,41.25z" fill="white" />
            </g>
          </g>
        </symbol>
        <use xlink:href="#twinkle" x="0" y="0" width="50" height="50" />
      </svg>

svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.group {
    transform: translate(42.5px, 42.5px);
}
path {
    transform: translate(-42.50px,-42.50px);
}
.large {
  opacity: 0;
	animation: large 3s linear infinite;
}
.large-2 {
  opacity: 0;
	animation: large-2 3s linear infinite;
}
.small {
  opacity: 0;
	animation: small 3s linear infinite;
}
@keyframes large {
	0% {
		opacity: 0;
		transform: rotate(0deg) scale(0);
	}
	16.667% {
		opacity: 1;
	}
	33.333% {
		opacity: 0;
		transform: rotate(360deg) scale(1.5);
	}
  100% {
		opacity: 0;
		transform: rotate(0deg) scale(0);
	}
}
@keyframes large-2 {
	0% {
		opacity: 0;
		transform: rotate(45deg) scale(0);
	}
	16.667% {
		opacity: 1;
	}
	33.333% {
		opacity: 0;
		transform: rotate(405deg) scale(1.1);
	}
  100% {
		opacity: 0;
		transform: rotate(45deg) scale(0);
	}
}
@keyframes small {
	0% {
		opacity: 0;
		transform: rotate(0deg) scale(0);
	}
	16.667% {
		opacity: 1;
	}
	33.333% {
		opacity: 0;
		transform: rotate(-360deg) scale(1.5);
	}
  100% {
		opacity: 0;
		transform: rotate(0deg) scale(0);
	}
}



function startAddingSparkles( info ){
//     //tracks the current count of sparkles for max tracking
//     var currentSparkleCount = 0;
//     //which element to put the sparkles inside of
//     var target = $(info.targetElement);
//     //what percentage of intervals to drop a sparkle
//     var dropRate = info.dropRate || .8;
//     //how often (in milliseconds) to check to drop a sparkle
//     var checkDuration = info.checkDuration || 30;
//     //how long each sparkle can last (this is chosen randomly)
//     var sparkleMaxLife = info.sparkleMaxLife || 4000;
//     //the maximum number of sparkles
//     var maxCount = info.maxCount || 50;
    
  
//     //start adding sparkles.  this calls checkSparkleAdd every checkDuration milliseconds
//     var mainSparkleTimer = setInterval( checkSparkleAdd, checkDuration);
    
//     //this function checks whether or not a sparkle should be created
//     //it is defined inside startAddingSparkles so it has access to the local variables here
//     function checkSparkleAdd(){
//       //if we haven't reached the maximum sparkle count, and we randomly choose below the chance to make a sparkle
//       if( currentSparkleCount < maxCount && Math.random() < dropRate){
//         //track that we made another sparkle
//         currentSparkleCount++;
//         //make a new sparkle with the function addSparkle in the given target
//         var sparkle = addSparkle(target);
//       }
//       //this function makes sparkles.  it is defined inside checkSparkleAdd so it ha access to the variables that that function made locally
//       function addSparkle(){
//         //determine a random position in the parent to be, based on %
//         var sparklePos = {
//           left: Math.random()*100 + '%',
//           top: Math.random()*100 + '%'
//         }
//         //generate a sparkle element
//         var sparkleDiv = $("<div>",{
//           'class': 'sparkle',
//           css: sparklePos
//         });
//         //add it to the target element
//         target.append(sparkleDiv);
//         //set a time whent the sparkle will die and disappear
//         setTimeout(removeSparkle, Math.random() * sparkleMaxLife)
//         //return the sparkleDiv so it can be removed by removeSparkle later
//         return sparkleDiv;
//       }
//       //this function will remove the sparkle when it expires
//       function removeSparkle(){
//         //remove the sparkle element
//         sparkle.remove();
//         //decrement the number of sparkles
//         currentSparkleCount--;
//       }
//     }
//     //this function will stop the sparkle generation by turning off the timer
//     //it is passed out of the main function so that it can be called when the user needs it
//     function stopSparkleGeneration(){
//       //stop the interval timer that is running and generating sparkles
//       clearInterval(mainSparkleTimer);
//     }
//     //return the function so it can be used by the caller to stop the sparkle generation
//     return stopSparkleGeneration
//   }
//   //can pass in many things, but requires the calcBody
//   startAddingSparkles({ targetElement: '.calc-container'})