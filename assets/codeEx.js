class TheHodgePodge{


    Welcome(){
        //Scroll dwon to see more!
        let mode = "welcome"


        //A switch statement controls the flow of a computer program. It's easier to read than an if statemnent!
        switch(mode){

            case "About":
                /*
                Hi! My name is Owen (OwenBOSS) Hodges. This website serves as my creative outlet. 
                You will find three major categories on this site:
                    1. Visualizations of computer algorithms
                    2. Interactive art pieces
                    3. My cookbook!
                    4. Blog posts (yet to come)
                */
                launchAboutPage();
                break;

            case "Goal":
                /*
                I have three goals when it comes to this website:
                    1. Learn HTML and CSS
                    2. Share my projects
                    3. Learn how to convey information in a manner that is accessable, beautiful,
                       and correctly interpreted by a broad range of people.
                */
               launchGoalsPage();
                break;
            
            default:
                break;
        }
    }
}