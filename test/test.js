export default function(type,props,children){
        let arr = new Array();
        for(let i = 2; i < arguments.length; i++){
            arr.push(arguments[i]);
        }
        return {
            type: type,
            props: props,
            children: arr
        }     
};
