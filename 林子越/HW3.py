import random
import time
import datetime
import csv

# 1. 判断输入 a 是否为质数
def is_prime(a):
    if a <= 1:
        return False
    for i in range(2, int(a**0.5) + 1):
        if a % i == 0:
            return False
    return True

# 2. 插入排序
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# 3. 选择排序
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# 4. 快速排序
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# 5. 排序性能测试
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    return arr

def test_sorting_algorithms():
    lengths = [100, 1000, 10000]
    sort_algorithms = {
        "Selection Sort": selection_sort,
        "Insertion Sort": insertion_sort,
        "Merge Sort": merge_sort
    }

    for length in lengths:
        data = random.sample(range(length * 10), length)
        print(f"\nArray Length: {length}")
        for name, algorithm in sort_algorithms.items():
            start_time = time.time()
            algorithm(data.copy())
            end_time = time.time()
            print(f"{name}: {end_time - start_time:.6f} seconds")

# 6. 获取当前系统时间
def get_current_time():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# 7. 读取 stuGrade.csv 并计算平均成绩
def calculate_averages(filename):
    with open(filename, 'r') as file:
        reader = csv.DictReader(file, delimiter='\t')
        chinese, math, english = 0, 0, 0
        count = 0
        for row in reader:
            chinese += int(row['chinese'])
            math += int(row['math'])
            english += int(row['english'])
            count += 1
        return round(chinese / count, 2), round(math / count, 2), round(english / count, 2)

# 8. 写入 my.txt 文件
def write_to_file(filename, averages):
    current_time = get_current_time()
    time.sleep(2)
    future_time = (datetime.datetime.now() + datetime.timedelta(seconds=2)).strftime("%Y-%m-%d %H:%M:%S")
    content = [
        "10235501440,林子越",  # 学号和姓名
        ",".join(map(str, averages)),
        current_time,
        future_time
    ]
    with open(filename, 'w') as file:
        file.write("\n".join(content))
    print(f"内容写入 {filename} 成功")

# 主函数
if __name__ == "__main__":
    # 1. 判断质数
    print("1. 判断质数:")
    print("17 是质数:", is_prime(17))
    print("16 是质数:", is_prime(16))

    # 2. 插入排序
    print("\n2. 插入排序:")
    print(insertion_sort([64, 34, 25, 12, 22, 11, 90]))

    # 3. 选择排序
    print("\n3. 选择排序:")
    print(selection_sort([64, 34, 25, 12, 22, 11, 90]))

    # 4. 快速排序
    print("\n4. 快速排序:")
    print(quick_sort([64, 34, 25, 12, 22, 11, 90]))

    # 5. 排序性能测试
    print("\n5. 排序性能测试:")
    test_sorting_algorithms()

    # 6. 获取当前时间
    print("\n6. 当前时间:")
    print(get_current_time())

    # 7. 计算平均成绩
    print("\n7. 计算平均成绩:")
    averages = calculate_averages('stuGrade.csv')
    print("各科平均成绩:", averages)

    # 写入 my.txt 文件
    print("\n8. 写入 my.txt 文件:")
    write_to_file('my.txt', averages)
