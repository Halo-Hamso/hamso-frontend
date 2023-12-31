import { ResponsiveBar } from '@nivo/bar'

function BarChart({ data }) {

    const theme = {
        text: {
            fontSize: 12, // 원하는 폰트 크기로 변경
        },
        axis: {
            legend: {
                text: {
                    fontSize: 16,
                }
            }
        },
    };


    return <ResponsiveBar
        data={data}
        theme={theme}
        //x축 y축 value 설정(시작))
        keys={[
            '수입',
            '지출',
        ]}
        indexBy="time"
        //x축 y축 value 설정 (끝)

        margin={{ top: 50, right: 20, bottom: 100, left: 60 }}
        //순수 그래프내부 사각형을 기준으로 하는 마진값
        padding={0.4}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#B09977','#799094']}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 0,
            tickRotation: 0,
            legend: '시간 (시)',
            legendPosition: 'middle',
            legendOffset: 40,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 0,
            tickRotation: 0,
            legend: '금액 (만원)',
            legendPosition: 'middle',
            legendOffset: -50,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        // legends={[
        //     {
        //         dataFrom: 'keys',
        //         anchor: 'bottom-right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 120,
        //         translateY: -500,
        //         itemsSpacing: 2,
        //         itemWidth: 100,
        //         itemHeight: 20,
        //         itemDirection: 'left-to-right',
        //         itemOpacity: 0.85,
        //         symbolSize: 20,
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemOpacity: 1
        //                 }
        //             }
        //         ]
        //     }
        // ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
    />
}
export default BarChart;

// // install (please try to align the version of installed @nivo packages)
// // yarn add @nivo/bar
// import { ResponsiveBar } from '@nivo/bar'

// // make sure parent container have a defined height when using
// // responsive component, otherwise height will be 0 and
// // no chart will be rendered.
// // website examples showcase many properties,
// // you'll often use just a few of them.
// const MyResponsiveBar = ({ data /* see data tab */ }) => (
//     <ResponsiveBar
//         data={data}
//         keys={[
//             'hot dog',
//             'burger',
//             'sandwich',
//             'kebab',
//             'fries',
//             'donut'
//         ]}
//         indexBy="country"
//         margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//         padding={0.6}
//         valueScale={{ type: 'linear' }}
//         indexScale={{ type: 'band', round: true }}
//         colors={{ scheme: 'nivo' }}
//         defs={[
//             {
//                 id: 'dots',
//                 type: 'patternDots',
//                 background: 'inherit',
//                 color: '#38bcb2',
//                 size: 4,
//                 padding: 1,
//                 stagger: true
//             },
//             {
//                 id: 'lines',
//                 type: 'patternLines',
//                 background: 'inherit',
//                 color: '#eed312',
//                 rotation: -45,
//                 lineWidth: 6,
//                 spacing: 10
//             }
//         ]}
//         fill={[
//             {
//                 match: {
//                     id: 'fries'
//                 },
//                 id: 'dots'
//             },
//             {
//                 match: {
//                     id: 'sandwich'
//                 },
//                 id: 'lines'
//             }
//         ]}
//         borderColor={{
//             from: 'color',
//             modifiers: [
//                 [
//                     'darker',
//                     1.6
//                 ]
//             ]
//         }}
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'country',
//             legendPosition: 'middle',
//             legendOffset: 32,
//             truncateTickAt: 0
//         }}
//         axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'food',
//             legendPosition: 'middle',
//             legendOffset: -40,
//             truncateTickAt: 0
//         }}
//         labelSkipWidth={12}
//         labelSkipHeight={12}
//         labelTextColor={{
//             from: 'color',
//             modifiers: [
//                 [
//                     'darker',
//                     1.6
//                 ]
//             ]
//         }}
//         legends={[
//             {
//                 dataFrom: 'keys',
//                 anchor: 'bottom-right',
//                 direction: 'column',
//                 justify: false,
//                 translateX: 120,
//                 translateY: 0,
//                 itemsSpacing: 2,
//                 itemWidth: 100,
//                 itemHeight: 20,
//                 itemDirection: 'left-to-right',
//                 itemOpacity: 0.85,
//                 symbolSize: 20,
//                 effects: [
//                     {
//                         on: 'hover',
//                         style: {
//                             itemOpacity: 1
//                         }
//                     }
//                 ]
//             }
//         ]}
//         role="application"
//         ariaLabel="Nivo bar chart demo"
//         barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
//     />
// )