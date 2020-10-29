import { IResolvers } from "graphql-tools";

export class GQL {
    static merge(r: IResolvers[]){
        let merge: any = {};
        if(Array.isArray(r)){
            r.forEach( res => {
                for(let k in res) {
                    if(merge.hasOwnProperty(k)){
                        merge[k] = Object.assign(merge[k],res[k])
                    }
                    else{
                        merge[k] = res[k]
                    }
                }
                return merge;
            })
        }
    return merge
    }
}