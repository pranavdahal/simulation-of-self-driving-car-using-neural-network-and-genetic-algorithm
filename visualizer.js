class Visualizer{
    static drawNetwork(ctx,network){
        const margin=50;
        const left=margin;
        const top=margin;
        const width=ctx.canvas.width-margin*2;
        const height=ctx.canvas.height-margin*2;

        const levelHeight=height/network.levels.length;

        // placing the levels using linear interpolation
        // placing top level first
        for(let i=network.levels.length-1;i>=0;i--){
            const levelTop=top+
                lerp(
                    height-levelHeight,
                    0,
                    network.levels.length==1?0.5:i/(network.levels.length-1)
                );

            ctx.setLineDash([7,3]);
            // for output layer define arrows.
            Visualizer.drawLevel(ctx,network.levels[i],
                left,levelTop,      //position of level
                width,levelHeight,
                i==network.levels.length-1?['🠉','🠈','🠊','🠋']:[] //output labels
            );
        }
    }

    static drawLevel(ctx,level,left,top,width,height,outputLabels){
        const right=left+width;
        const bottom=top+height;

        const {inputs,outputs,weights,biases}=level;

        // connecting layers
        for(let i=0;i<inputs.length;i++){
            for(let j=0;j<outputs.length;j++){
                ctx.beginPath();
                ctx.moveTo(
                    Visualizer.#getNodeX(inputs,i,left,right),
                    bottom
                );
                ctx.lineTo(
                    Visualizer.#getNodeX(outputs,j,left,right),
                    top
                );
                ctx.lineWidth=2;
                ctx.strokeStyle=getRGBA(weights[i][j]);     // color of feed forward line
                ctx.stroke();
            }
        }

        // drawing input layer
        const nodeRadius=18;
        for(let i=0;i<inputs.length;i++){
            // x co-ordinate of each input node
            const x=Visualizer.#getNodeX(inputs,i,left,right);
            ctx.beginPath();
            ctx.arc(x,bottom,nodeRadius,0,Math.PI*2);
            ctx.fillStyle="black";      // fill color of input layer
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x,bottom,nodeRadius*0.6,0,Math.PI*2);
            ctx.fillStyle=getRGBA(inputs[i]);
            ctx.fill();
        }
        
        // drawing output layers
        for(let i=0;i<outputs.length;i++){
            const x=Visualizer.#getNodeX(outputs,i,left,right);
            ctx.beginPath();
            ctx.arc(x,top,nodeRadius,0,Math.PI*2);
            ctx.fillStyle="black";      // fill color of levels (except input)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x,top,nodeRadius*0.6,0,Math.PI*2);
            ctx.fillStyle=getRGBA(outputs[i]);
            ctx.fill();
            
            //output border circle
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.arc(x,top,nodeRadius*0.8,0,Math.PI*2);
            ctx.strokeStyle=getRGBA(biases[i]);
            ctx.setLineDash([3,3]);
            ctx.stroke();
            ctx.setLineDash([]);

            if(outputLabels[i]){
                ctx.beginPath();
                ctx.textAlign="center";
                ctx.textBaseline="middle";
                ctx.fillStyle="black";      // fill color of output circle
                ctx.strokeStyle="white";    //outline of arrow symbols
                ctx.font=(nodeRadius*1.5)+"px Arial";
                ctx.fillText(outputLabels[i],x,top+nodeRadius*0.1);
                ctx.lineWidth=0.5;
                ctx.strokeText(outputLabels[i],x,top+nodeRadius*0.1);
            }
        }
    }

    //creating nodes graphics
    static #getNodeX(nodes,index,left,right){
        return lerp(
            left,
            right,
            nodes.length==1?0.5:index/(nodes.length-1)
        );
    }
}