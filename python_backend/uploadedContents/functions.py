
def mergeSortData(data,by="uploadDate"):
    if len(data) <= 1:
        return data
    left = data[:len(data)//2]
    right = data[len(data)//2:]
    merged = []
    i,j = 0,0
    while i < len(left) and j < len(right):
        if left[i][by] <= right[j][by]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    return merged + left[i:] + right[j:]