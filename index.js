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
                let debug = 3000
                this.listarPastas(newPath).then((tcc) => {
                    console.log(newPath + '\\' + tcc);
                    execSync(`cd ${newPath}\\${tcc} && pm2 start npm --name "${tcc}" -- start`, {shell: true});
                    debug++;
                });
            });
        });
    }

}

Worker.subirAPI('C:\\Users\\wwwgu\\Desktop\\API');