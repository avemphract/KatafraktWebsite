import { RefMaybe } from "utils/types/RefObject";

export function matrixCalculation(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][] }[], matrix: number[][]): number[][] {
    for (let i = 0; i < processes.length; i++) {
        const process = processes[i];
        if (process.type == "mult") {
            matrix = matrixMultip(process.matrix, matrix);
        } else {
            matrix = matrixaddition(process.matrix, matrix);
        }
    }
    return matrix;
}

export function reverseCalculation(processes: { type: "mult" | "add"; matrix: RefMaybe<number>[][] }[], matrix: number[][]): number[][] {
    for (let i = processes.length - 1; i >= 0; i--) {
        const process = processes[i];
        if (process.type == "mult") {
            matrix = matrixMultip(matrixInverse(process.matrix), matrix);
        } else {
            matrix = matrixaddition(matrixReverseSign(process.matrix), matrix);
        }
    }
    return matrix;
}

export function matrixaddition(addition: RefMaybe<number>[][]|number[][], value: number[][]): number[][] {
    const result: number[][] = [];
    if(typeof addition[0][0] == "number"){
        for (let i = 0; i < value.length; i++) {
            result[i] = [];
            for (let j = 0; j < value[i].length; j++) {
                result[i][j] = value[i][j] + (addition[0][j] as number);
            }
        }
    }
    else{
        for (let i = 0; i < value.length; i++) {
            result[i] = [];
            for (let j = 0; j < value[i].length; j++) {
                result[i][j] = value[i][j] + (addition[0][j] as RefMaybe<number>).value;
            }
        }
    }
    return result;
}

export function matrixMultip(multip: RefMaybe<number>[][]|number[][], value: number[][]): number[][] {
    const result: number[][] = [];
    if(typeof multip[0][0] == "number"){
        for (let m = 0; m < value.length; m++) {
            result[m] = [];
            for (let r = 0; r < multip[0].length; r++) {
                result[m][r] = 0;
                for (let k = 0; k < value[m].length; k++) {
                    result[m][r] += (multip[k][r] as number) * value[m][k];
                }
            }
        }
    }
    else{
        for (let m = 0; m < value.length; m++) {
            result[m] = [];
            for (let r = 0; r < multip[0].length; r++) {
                result[m][r] = 0;
                for (let k = 0; k < value[m].length; k++) {
                    result[m][r] += (multip[k][r] as RefMaybe<number>).value * value[m][k];
                }
            }
        }
    }
    
    return result;
}

export function matrixReverseSign(matrix: RefMaybe<number>[][]): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix[0].length; j++) {
            result[i][j] = -matrix[i][j].value;
        }
    }
    return result;
}

//yalnızca iki boyutlu matrisler için
export function matrixInverse(matrix: RefMaybe<number>[][]): number[][] {
    const result = [
        [0, 0],
        [0, 0]
    ];
    const d = Math.abs(matrix[0][0].value * matrix[1][1].value - matrix[0][1].value * matrix[1][0].value);
    result[0][0] = matrix[1][1].value / d;
    result[1][0] = -matrix[1][0].value / d;
    result[0][1] = -matrix[0][1].value / d;
    result[1][1] = matrix[0][0].value / d;
    return result;
}
