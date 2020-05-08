export function calculateExecutionTime(func, input, functionName = '', printOutput = true) {
    const startTime = Date.now();
    const output = func(...input);
    const endTime = Date.now();
    if (printOutput){
        console.log(output);
    }
    console.log("Execution time of " + functionName  + ": " + (endTime - startTime) );

}