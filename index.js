import { execSync, exec } from 'child_process';
import { readFileSync } from 'fs';
import { readdir } from 'fs/promises';

class Worker {
    
    constructor(){
        this.ports = JSON.parse(readFileSync('webserver.json'));
    }
    
    static listarPastas(path) {
        // Retorna uma promise com array com nomes dos arquivos
        return readdir(path, 'utf8');
    }

    static subirAPI(path) {
        let pastas = this.listarPastas(path);
        pastas.then((item) => {
            item.forEach(element => {
                let newPath = path + `\\${element}`
                this.listarPastas(newPath).then((item) => {
                    item.forEach((tcc)=>{
                        execSync(`cd ${newPath}\\${tcc} && pm2 start npm --name "${tcc}" -- start`, {shell: true});
                    })
                });
            });
        });
    }

}

Worker.subirAPI('C:\\Users\\wwwgu\\Desktop\\API');