'''
This script calculates the total head movements for various disk scheduling algorithms.
'''

def fcfs(tracks, head_pos):
    total_movement = 0
    current_pos = head_pos
    path = [head_pos]
    for track in tracks:
        total_movement += abs(track - current_pos)
        current_pos = track
        path.append(current_pos)
    return total_movement, path

def sstf(tracks, head_pos):
    total_movement = 0
    current_pos = head_pos
    remaining_tracks = list(tracks)
    path = [head_pos]
    while remaining_tracks:
        closest_track = min(remaining_tracks, key=lambda x: abs(x - current_pos))
        total_movement += abs(closest_track - current_pos)
        current_pos = closest_track
        path.append(current_pos)
        remaining_tracks.remove(closest_track)
    return total_movement, path

def scan(tracks, head_pos, max_track):
    total_movement = 0
    current_pos = head_pos
    path = [head_pos]
    sorted_tracks = sorted(list(tracks))
    
    left = [t for t in sorted_tracks if t <= current_pos]
    right = [t for t in sorted_tracks if t > current_pos]
    
    # Move right first
    for track in right:
        total_movement += abs(track - current_pos)
        current_pos = track
        path.append(current_pos)
    
    # Move to max_track if not already there
    if current_pos != max_track:
        total_movement += abs(max_track - current_pos)
        current_pos = max_track
        path.append(current_pos)

    # Move left
    for track in sorted(left, reverse=True):
        total_movement += abs(track - current_pos)
        current_pos = track
        path.append(current_pos)
        
    return total_movement, path

def c_scan(tracks, head_pos, max_track):
    total_movement = 0
    current_pos = head_pos
    path = [head_pos]
    sorted_tracks = sorted(list(tracks))
    
    right = [t for t in sorted_tracks if t >= current_pos]
    left = [t for t in sorted_tracks if t < current_pos]
    
    # Move right to max_track
    for track in right:
        total_movement += abs(track - current_pos)
        current_pos = track
        path.append(current_pos)
    
    if current_pos != max_track:
        total_movement += abs(max_track - current_pos)
        current_pos = max_track
        path.append(current_pos)

    # Jump to 0 and move right
    if left:
        total_movement += abs(0 - current_pos)  # Move from max_track to 0
        current_pos = 0
        path.append(current_pos)
        for track in left:
            total_movement += abs(track - current_pos)
            current_pos = track
            path.append(current_pos)
            
    return total_movement, path

def look(tracks, head_pos):
    total_movement = 0
    current_pos = head_pos
    path = [head_pos]
    sorted_tracks = sorted(list(tracks))
    
    left = [t for t in sorted_tracks if t <= current_pos]
    right = [t for t in sorted_tracks if t > current_pos]
    
    # Move right first
    for track in right:
        total_movement += abs(track - current_pos)
        current_pos = track
        path.append(current_pos)
    
    # Move left
    for track in sorted(left, reverse=True):
        total_movement += abs(track - current_pos)
        current_pos = track
        path.append(current_pos)
        
    return total_movement, path

def c_look(tracks, head_pos):
    total_movement = 0
    current_pos = head_pos
    path = [head_pos]
    sorted_tracks = sorted(list(tracks))
    
    right = [t for t in sorted_tracks if t >= current_pos]
    left = [t for t in sorted_tracks if t < current_pos]
    
    # Move right
    for track in right:
        total_movement += abs(track - current_pos)
        current_pos = track
        path.append(current_pos)
    
    # Jump to the smallest track on the left and move right
    if left:
        total_movement += abs(min(left) - current_pos)
        current_pos = min(left)
        path.append(current_pos)
        for track in sorted(left):
            total_movement += abs(track - current_pos)
            current_pos = track
            path.append(current_pos)
            
    return total_movement, path

def lifo(tracks, head_pos):
    total_movement = 0
    current_pos = head_pos
    path = [head_pos]
    # LIFO is not a standard disk scheduling algorithm, assuming it means processing in reverse order of request
    # Or it could mean processing the last requested track first, which is essentially just reversing the input list.
    # I will assume it means processing the tracks in the reverse order of their appearance in the input list.
    # If a different interpretation is needed, please clarify.
    
    reversed_tracks = list(tracks)
    reversed_tracks.reverse()
    
    for track in reversed_tracks:
        total_movement += abs(track - current_pos)
        current_pos = track
        path.append(current_pos)
    return total_movement, path


# Given data
jumlah_track = 2050
posisi_head = 1234

# Calculated x values
x1 = 310
x2 = 900
x3 = 2002
x4 = 195

urutan_track_raw = [1500, 1100, 1750, 1900, x1, 850, 60, 1300, 1400, 600, x2, 1500, 1000, 30, 1900, x3, 700, 1300, 55, 2025, x4, 700, 1500, 200]

# Remove duplicates and sort for algorithms that require it, but keep original order for FCFS/LIFO
urutan_track_unique = list(dict.fromkeys(urutan_track_raw)) # Preserve order while removing duplicates

algorithms = {
    "FCFS": fcfs(urutan_track_raw, posisi_head),
    "SSTF": sstf(urutan_track_raw, posisi_head),
    "SCAN": scan(urutan_track_raw, posisi_head, jumlah_track - 1), # Max track is jumlah_track - 1 (0-indexed)
    "C-SCAN": c_scan(urutan_track_raw, posisi_head, jumlah_track - 1),
    "LOOK": look(urutan_track_raw, posisi_head),
    "C-LOOK": c_look(urutan_track_raw, posisi_head),
    "LIFO": lifo(urutan_track_raw, posisi_head)
}

results = {}
for name, (movement, path) in algorithms.items():
    results[name] = {"movement": movement, "path": path}

# Output results to a file
with open("disk_scheduling_results.txt", "w") as f:
    f.write("Disk Scheduling Algorithm Results:\n\n")
    for name, data in results.items():
        f.write(f"Algorithm: {name}\n")
        f.write(f"Total Head Movement: {data['movement']}\n")
        f.write(f"Path: {data['path']}\n\n")

print("Calculations complete. Results saved to disk_scheduling_results.txt")


