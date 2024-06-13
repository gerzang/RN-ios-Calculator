import React from 'react'
import { Pressable, Text } from 'react-native'
import { colors, globalStyles } from '../../config/theme/app-theme'

interface Props {
    label: string;
    color?: string;
    doubleSize?: boolean;
    balckText?: boolean;
    onPress: () => void
}
const CalculatorButton = ({
    label,
    color = colors.darkGray,
    doubleSize = false, 
    balckText = false, 
    onPress
}: Props) => {
    return (
        <Pressable 
        onPress={() => onPress()}
        style={({ pressed }) => ({
            ...globalStyles.button,
            backgroundColor: color,
            opacity: (pressed) ? 0.8 : 1,
            width: (doubleSize) ? 180 : 80
        })}>
            <Text style={{
                ...globalStyles.buttonText,
                color: (balckText) ? colors.background : colors.textPrimary
            }}>{label}</Text>
        </Pressable>
    )
}

export default CalculatorButton
