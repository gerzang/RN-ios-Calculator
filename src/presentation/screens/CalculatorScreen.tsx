import React from 'react'
import { Text, View } from 'react-native'
import { colors, globalStyles } from '../../config/theme/app-theme'
import CalculatorButton from '../components/CalculatorButton'
import useCalculator from '../hooks/useCalculator'

const CalculatorScreen = () => {

    const {
        num,
        buildNumber,
        toggleSign, clean,
        deleteOperation,
        divideOperation,
        subtractOperation,
        multiplyOperation,
        addOperation,
        prevNum,
        calculateResult,
        formula
    } = useCalculator();

    return (
        <View style={globalStyles.calculatorContainer}>
            <View style={{ paddingHorizontal: 30, paddingBottom: 20 }}>
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={globalStyles.mainResult}>
                    {formula}
                </Text>
                {(formula === prevNum) ? <Text  style={globalStyles.subResult} /> : <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={globalStyles.subResult}>
                    {prevNum}
                </Text>}

            </View>
            <View style={globalStyles.row}>
                <CalculatorButton onPress={() => clean()} balckText label='C' color={colors.lightGray} />
                <CalculatorButton onPress={() => toggleSign()} balckText label='+/-' color={colors.lightGray} />
                <CalculatorButton onPress={() => deleteOperation()} balckText label='del' color={colors.lightGray} />
                <CalculatorButton onPress={() => divideOperation()} label='÷' color={colors.orange} />
            </View>

            <View style={globalStyles.row}>
                <CalculatorButton onPress={() => buildNumber('7')} label='7' />
                <CalculatorButton onPress={() => buildNumber('8')} label='8' />
                <CalculatorButton onPress={() => buildNumber('9')} label='9' />
                <CalculatorButton onPress={() => multiplyOperation()} label='x' color={colors.orange} />
            </View>

            <View style={globalStyles.row}>
                <CalculatorButton onPress={() => buildNumber('4')} label='4' />
                <CalculatorButton onPress={() => buildNumber('5')} label='5' />
                <CalculatorButton onPress={() => buildNumber('6')} label='6' />
                <CalculatorButton onPress={() => subtractOperation()} label='-' color={colors.orange} />
            </View>

            <View style={globalStyles.row}>
                <CalculatorButton onPress={() => buildNumber('1')} label='1' />
                <CalculatorButton onPress={() => buildNumber('2')} label='2' />
                <CalculatorButton onPress={() => buildNumber('3')} label='3' />
                <CalculatorButton onPress={() => addOperation()} label='+' color={colors.orange} />
            </View>

            <View style={globalStyles.row}>
                <CalculatorButton onPress={() => buildNumber('0')} label='0' doubleSize={true} />
                <CalculatorButton onPress={() => buildNumber('.')} label='.' />
                <CalculatorButton onPress={() => calculateResult()} label='=' color={colors.orange} />

            </View>

        </View>
    )
}

export default CalculatorScreen
