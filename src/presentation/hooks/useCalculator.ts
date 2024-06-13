import { useEffect, useRef, useState } from "react"
enum Operator {
    add = "+",
    subtract = '-',
    multiply = 'x',
    divide = '÷'
}

const useCalculator = () => {

    const [num, setNum] = useState('0');
    const [prevNum, setPrevNum] = useState('0');
    const [formula, setFormula] = useState('');
    const lastOperation = useRef<Operator>();

    useEffect(() => {
        if (lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${num}`)
        } else {

            setFormula(num)
        }
    }, [num])

    useEffect(() => {
        const subResult = calculateSubResult();
        setPrevNum(`${subResult}`);
    }, [formula])

    const clean = () => {
        setNum('0');
        setPrevNum('0');
        lastOperation.current = undefined;
        setFormula('');
    }

    const deleteOperation = () => {
        let currentSing: string = '';
        let temporalNum: string = num;
        if (num.includes('-')) {
            currentSing = '-';
            temporalNum = num.substring(1);
        }
        if (temporalNum.length > 1) {
            return setNum(currentSing + temporalNum.slice(0, -1));
        }
        if (temporalNum.length === 1) {
            return setNum('0')
        }
    }

    const toggleSign = () => {
        if (num.includes('-')) {
            return setNum(num.replace('-', ''))
        }
        setNum('-' + num)
    }

    const buildNumber = (numString: string) => {
        if (num.includes('.') && numString === '.') return
        if (num.startsWith('0') || num.startsWith('-0')) {
            if (numString === '.') {
                return setNum(num + numString)
            }

            if (numString === '0' && num.includes('.')) {
                return setNum(numString)
            }

            if (numString !== '0' && !num.includes('.')) {
                return setNum(numString)
            }
            if (numString === '0' && !num.includes('.')) {
                return
            }
            return setNum(num + numString);
        }
        setNum(num + numString)
    }

    const setLastNumber = () => {
        calculateResult()
        if (num.endsWith('.')) {
            setPrevNum(num.slice(0, -1))
        } else {
            setPrevNum(num)
        }
        setNum('0')
    }

    const divideOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.divide
    }

    const multiplyOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.multiply
    }

    const subtractOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.subtract
    }

    const addOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.add
    }


    const calculateResult = () => {
        const result = calculateSubResult();
        setFormula(`${result}`);
        lastOperation.current = undefined;
        setPrevNum('0')
    }

    const calculateSubResult = (): number => {
        const [firstValue, operation, secondValue] = formula.split(' ')
        const num1 = Number(firstValue)
        const num2 = Number(secondValue)
        

        if (isNaN(num2)) return num1

        switch (operation) {
            case Operator.add:
                return num1 + num2
            case Operator.subtract:
                return num1 - num2
            case Operator.multiply:
                return num1 * num2
            case Operator.divide:
                return num1 / num2
            default:
                throw Error('No operation selected')
        }
    }

    return {
        num,
        buildNumber,
        clean,
        toggleSign,
        deleteOperation,
        divideOperation,
        subtractOperation,
        multiplyOperation,
        addOperation,
        prevNum,
        calculateResult,
        formula
    }
}

export default useCalculator
