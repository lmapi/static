# yanhua

#nohup ffmpeg -i 4998.mp4  -c:v libx264  -b:a 128k  -hls_time 10  -hls_list_size 0 -hls_segment_filename 4998/%05d.ts 4998/index.m3u8 1>/dev/null 2>&1 &
