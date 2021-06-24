import './main.scss';

let boomSound: HTMLAudioElement;
let clapSound: HTMLAudioElement;
let hihatSound: HTMLAudioElement;
let kickSound: HTMLAudioElement;
let openhatSound: HTMLAudioElement;
let rideSound: HTMLAudioElement;

let recordButton: HTMLButtonElement;
let playButton: HTMLButtonElement;

const progressBar: HTMLProgressElement = document.querySelector("progress") as HTMLProgressElement;

let isRecording: boolean = false;
//let isPlaying: boolean = false;
let startTime: number;
let recordedTrack: any[] = [];

let soundButton: any;

appStart();

function appStart() {
    getElements();
    initListener();
}

function getElements(): void {
    boomSound = document.querySelector('[data-sound="boom"]');
    clapSound = document.querySelector('[data-sound="clap"]');
    hihatSound = document.querySelector('[data-sound="hihat"]');
    kickSound = document.querySelector('[data-sound="kick"]');
    openhatSound = document.querySelector('[data-sound="openhat"]');
    rideSound = document.querySelector('[data-sound="ride"]');

    recordButton = document.querySelector('[data-action="record"');
    playButton = document.querySelector('[data-action="play"]');
}

function initListener() {
    document.body.addEventListener('keypress', onKeyDown);
    recordButton.addEventListener('click', recorderChange);
    playButton.addEventListener('click', playChange);
}

function recorderChange(ev: MouseEvent) {
    isRecording = !isRecording;
    if(isRecording) {
        recordButton.innerText = "Stop";
        recordedTrack = [];
        startTime = ev.timeStamp;
    } else {
        recordButton.innerText = "Record";
    }
}

function onKeyDown(ev: KeyboardEvent) {
    
    if(isRecording) {
        const key = ev.key;
        const time = ev.timeStamp - startTime;
        playSound(ev.key, 0);

        recordedTrack.push({key, time});
    } else {
        playSound(ev.key, 0);
    }
}

function playSound(key: string, soundTime?: any) {
    progressBar.value = soundTime;
    key = key.toLowerCase();

    switch(key) {
        case "q":
            boomSound.currentTime = 0;
            boomSound.play();
            break;
        case "w":
            clapSound.currentTime = 0;
            clapSound.play();
            break;
        case "e":
            hihatSound.currentTime = 0;
            hihatSound.play();
            break;
        case "a":
            kickSound.currentTime = 0;
            kickSound.play();
            break;
        case "s":
            openhatSound.currentTime = 0;
            openhatSound.play();
            break;
        case "d":
            rideSound.currentTime = 0;
            rideSound.play();
            break;
    }

 }

function playChange() {
    playRecorded();
    // tory były złe i szyny, szyny tez były złe : (((
    // isPlaying = !isPlaying;

    // if(isPlaying) {
    //     playButton.innerText = "Stop";
    //     playRecorded();
    // } else {
    //     playButton.innerText = "Play";
    // }
    
 }

 function playRecorded() {
    progressBar.max = recordedTrack[recordedTrack.length - 1].time;
    progressBar.value = 0;

    recordedTrack.forEach(sound => {
        setTimeout(() => playSound(sound.key, sound.time), sound.time);
    });
 }