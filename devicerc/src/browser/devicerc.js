let deviceRC={
    "ws":null,
    "queue":{
        "variable":{},
        "function":{},
        "exec":{}
    },                    
    "connect":(deviceKey, server)=>{                     
        return new Promise((resolve, reject) => {
            deviceRC.ws = new WebSocket(`${server}/${deviceKey}`);
            deviceRC.ws.onopen = (event) => {
                resolve();
            };

            deviceRC.ws.onmessage = (event) => {
                let m = JSON.parse(event.data);
                
                switch(m[0]){
                    case "VG":
                    case "VS":
                        deviceRC.queue.variable[m[1]] = m[2];
                    break;                                    
                    case "F":
                        deviceRC.queue.function[m[1]] = m[2];
                    break;
                    case "X":
                        deviceRC.queue.exec[m[1]] = m[2];
                    break;
                    case "W":
                    case "E":
                        window.dispatchEvent(new CustomEvent(m[1], {
                            detail: m[2]
                        }));
                    break;
                    case "CONNECTED":
                        window.dispatchEvent(new CustomEvent("connect", {
                            detail: m[1]
                        }));
                    break;
                    case "DISCONNECTED":
                        window.dispatchEvent(new CustomEvent("disconnect", {
                            detail: m[1]
                        }));
                    break;
                    case ".":
                        window.dispatchEvent(new CustomEvent("pong", {
                            detail: m[1]
                        }));
                    break;
                }
            }
        });                
    },                   
    "variable":(variableName, val)=>{
        return new Promise((resolve, reject) => {
            if(typeof val==="undefined"){
                deviceRC.send(["VG",variableName]);
            }else{
                deviceRC.send(["VS",variableName, val]);
            }

            let i=setInterval(()=>{
                if(typeof deviceRC.queue.variable[variableName]!=="undefined"){
                    clearInterval(i);
                    resolve(deviceRC.queue.variable[variableName]);
                    delete deviceRC.queue.variable[variableName];
                }
            },250);
        });
    },
    "function":(functionName, params)=>{
        return new Promise((resolve, reject) => {
            deviceRC.send(["F",functionName,params]);
            let i=setInterval(()=>{
                if(typeof deviceRC.queue.function[functionName]!=="undefined"){
                    clearInterval(i);
                    resolve(deviceRC.queue.function[functionName]);                                    
                    delete deviceRC.queue.function[functionName];
                }
            },250);
        });  
    },
    "watcher":(name, interval, cap=1)=>{
        deviceRC.send(["W", name, interval, cap]);
    },
    "eventHistory":(name, cap=1)=>{
        deviceRC.send(["EVT", name, cap]);
    },
    "exec":(id, code)=>{
        return new Promise((resolve, reject) => {
            deviceRC.send(["X", id, code]);
            let i=setInterval(()=>{
                if(typeof deviceRC.queue.exec[id]!=="undefined"){
                    clearInterval(i);
                    resolve(deviceRC.queue.exec[id]);                                    
                    delete deviceRC.queue.exec[id];
                }
            },250);
        });
        
    },
    "reboot":()=>{
        deviceRC.send(["R"]);
    },
    "ping":()=>{
        deviceRC.send(["."]);
    },
    "send":(payload)=>{
        deviceRC.ws.send(JSON.stringify(payload));
    }

};