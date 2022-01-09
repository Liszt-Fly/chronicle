import { dialog } from '@electron/remote'
import { display, files } from './config';
import { defineEmits } from 'vue'
import { sortFileInDepth } from './util';

export let openFolder = () => {
    let path = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
    if (path) {
        sortFileInDepth(path[0], files.value)
    }
    console.log(files.value);

}

export let toggleTabBar = (parameter: String) => {
    display.value = !display.value
}