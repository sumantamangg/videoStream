// export interface Video {
//     play: boolean;
//     currentTime: number;
// }

export interface Video {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    muted: boolean;
    // buffered: TimeRanges; 
    error: string | null; 
}