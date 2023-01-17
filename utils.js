function lerp(A,B,t){
    return A+(B-A)*t;
}

function getIntersection(A,B,C,D){ 
    /*
        intersection X = Ax+(Bx-Ax)t  = Cx+(Dx-Cx)u
        intersection y = Ay+(By-Ay)t  = Cy+(Dy-Cy)u

        Ax+(Bx-Ax)t  = Cx+(Dx-Cx)u  //-Cx
        -> (Ax-Cx)+(Bx-Ax)t  = (Dx-Cx)u

        Ay+(By-Ay)t  = Cy+(Dy-Cy)u      //-Cy
        -> (Ay-Cy)+(By-Ay)t  = (Dy-Cy)u       //*(Dx-Cx)
        -> (Dx-Cx)(Ay-Cy)+(Dx-Cx)(By-Ay)t  = (Dy-Cy)(Dx-Cx)u 
        -> (Dx-Cx)(Ay-Cy)+(Dx-Cx)(By-Ay)t  = (Dy-Cy)[(Ax-Cx)+(Bx-Ax)t]
        -> (Dx-Cx)(Ay-Cy)+(Dx-Cx)(By-Ay)t  = (Dy-Cy)(Ax-Cx)+(Dy-Cy)(Bx-Ax)t
        //subtract (Dy-Cy)(Ax-Cx)
        -> -(Dy-Cy)(Ax-Cx)+(Dx-Cx)(Ay-Cy)+(Dx-Cx)(By-Ay)t  = (Dy-Cy)(Bx-Ax)t
        // subtract (Dx-Cx)(By-Ay)t
        -> (Dx-Cx)(Ay-Cy)-(Dy-Cy)(Ax-Cx) = (Dy-Cy)(Bx-Ax)t-(Dx-Cx)(By-Ay)t
        // Find t
        top = (Dx-Cx)(Ay-Cy)-(Dy-Cy)(Ax-Cx)
        bottom = (Dy-Cy)(Bx-Ax)t-(Dx-Cx)(By-Ay)t
        t = top/bottom

    */
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                // intersection point
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                // distance of sensed object
                offset:t
            }
        }
    }
    return null;
}

function polysIntersect(poly1, poly2){
    for(let i=0;i<poly1.length;i++){
        for(let j=0;j<poly2.length;j++){
            const touch=getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if(touch){
                return true;
            }
        }
    }
    return false;
}

function getRGBA(value){
    const alpha=Math.abs(value);
    const R=value<0?0:255;
    const G=R;
    const B=value>0?0:255;
    return "rgba("+R+","+G+","+B+","+alpha+")";
}

function getRandomColor() {
    var hue = Math.floor(Math.random() * 360); // generate a random hue value between 0 and 360
    return 'hsl('+hue+',100%,70%)';
}
  
  
                