const antnnaTypes = [{
        value: '',
        label: '未选择'
    },
    {
        value: '1',
        label: '圆柱'
    },
    {
        value: '2',
        label: '圆孔'
    },
    {
        value: '3',
        label: '方柱'
    },
    {
        value: '4',
        label: '方孔'
    },
    {
        value: '5',
        label: '椭圆柱'
    },
];

const bottomTypes = [{
        value: '',
        label: '未选择'
    },
    {
        value: '1',
        label: '正方形'
    },
    {
        value: '2',
        label: '正六边形'
    },
]

const dataFrom = [{
        value: '',
        label: '未选择'
    },
    {
        value: '1',
        label: "CST STUDIO"
    },
    {
        value: '2',
        label: "FDTD Solutions"
    },
    {
        value: '3',
        label: "COMSOL Multiphysics"
    },
]

const lightFrom = [{
        value: '',
        label: '未选择'
    },
    {
        value: '1',
        label: "LP-x(x轴线偏光)"
    },
    {
        value: '2',
        label: "LP-y(y轴线偏光)"
    },
    {
        value: '3',
        label: "LCP(左旋圆偏光)"
    },
    {
        value: '4',
        label: "RCP(右旋圆偏光)"
    },
    {
        value: '5',
        label: "自然光"
    },
]

const workMethod = [{
        value: '',
        label: '未选择'
    },
    {
        value: "1",
        label: "反射式"
    },
    {
        value: "2",
        label: "透射式"
    },
    {
        value: "3",
        label: "吸收式"
    },
]
const Polarization = [{
        value: '',
        label: '未选择'
    },
    {
        value: "1",
        label: "右旋圆偏振光"
    },
    {
        value: "2",
        label: "左旋圆偏振光"
    },
    {
        value: "3",
        label: "线偏振光"
    },
]


const FillerMaterial = [{
    value: '',
    label: '未选择'
}, {
    value: '1',
    label: '真空泡沫'
}, {
    value: '2',
    label: '粘合胶'
}, ]


const DataDownload = [{
        value: '',
        label: '未选择'
    }, {
        value: '2',
        label: '红外宽带偏振转换',
        example:"/photon/eInfraredPolarizationConversion"
    },
    {
        value: '3',
        label: '红外宽带位相调控',
        example:"/photon/eInfraredPhaseControl",
    },
    {
        value: '4',
        label: '可见光宽带位相调控',
        example:"/photon/eVisibleLightPhaseControl"
    },
    {
        value: '5',
        label: '微波窄带吸收',
        example: "/photon/eMicrowaveTransmission"
    },
    // {
    //     value: '6',
    //     label: '辐射制冷'
    // }, 
    {
        value: '7',
        label: '红外窄带传感',
        example:"/photon/eInfraredSensor"
    },
    //  {
    //     value: '8',
    //     label: '红外兼容-透射层'
    // }, {
    //     value: '9',
    //     label: '红外兼容-吸收层'
    // }, 
    {
        value: '10',
        label: '红外宽带高反及微波宽带高透',
        example:"/photon/eInfraredAndMicrowaveIntegration"
    }, {
        value: '12',
        label: '微波宽带偏振转换',
        example:"/photon/eUltraWideband"
    }, {
        value: '11',
        label: '微波宽带位相调控',
        example:"/photon/ePolarizationConversion",
    }, {
        value: '13',
        label: '微波宽带吸收',
        example:"/photon/eMicrowaveAbsorber"
    },
      {
         value: '14',
         label: '微波窄带透波及宽带吸波',
         example:"/photon/eIntegration"
     }, 
    //{
    //     value: '15',
    //     label: '纳米天线'
    // },
    {
        value: '16',
         label: '衍射组件',
        example:"/photon/ediffraction"
    },{
        value: '17',
        label: '拓扑优化超透镜',
        example:"/photon/eTopology"
    }
]


const exp = {
    antnnaTypes: antnnaTypes,
    bottomTypes: bottomTypes,
    dataFrom: dataFrom,
    lightFrom: lightFrom,
    workMethod: workMethod,
    Polarization: Polarization,
    FillerMaterial: FillerMaterial,
    DataDownload: DataDownload
}

export default exp;