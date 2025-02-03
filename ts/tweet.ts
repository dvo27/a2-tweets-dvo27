class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if (this.text.startsWith("Just completed a") || this.text.startsWith("Just posted a")) {
            return 'completed_event';
        } else if (this.text.startsWith("Achieved a new personal record")) {
            return "achievement";
        } else if (this.text.includes("RKLive")) {
            return "live_event";
        } else {
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        if (this.text.includes("-")) {
            return true;
        }
        return false;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        return this.text;
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }

        var split = this.text.split(" ");

        // only include distance-based activities
        if (!(split[5]).match(/\d/) && (split.includes("mi") || split.includes("km"))) {
            return split[5];
        }
        return "unknown";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        var split = this.text.split(" ");

        // only include distance-based activities
        if (!(split[5]).match(/\d/) && (split.includes("mi") || split.includes("km"))) {
            var distance = Number(split[3]);
            
            // km to mi conversion
            if (split.includes("km")) {
                distance /= 1.609;
            }
            return distance;
        }
        
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}