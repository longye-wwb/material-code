const homeRoute = {
    path: 'photon',
    components: {
        header: () => import('./components/headers/PhotonHomeHeader.vue'),
        menu: () => import('./components/menus/PhotonHomeMenu.vue'),
        default: () => import('./components/headers/PhotonManagerLayout.vue'),
        footer: () => import('./components/headers/PhotonManagerFooter.vue'),
    },
    children: [{
        path: '',
        name: "AtdataHome",
        component: () => import('./views/AtdataHome/AtdataHome.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }]
        }
    },
    {
        path: 'AboutUS',
        name: "AtdataHome",
        component: () => import('./views/aboutUS/aboutUS.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }]
        }
    },
    {
        path: 'absorbing',
        name: 'AbsorbingMaterailList',
        component: () => import('./views/materials/AbsorbingMaterialsListView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '吸波材料',
                url: '/photon/absorbing'
            }]
        }
    },
    {
        path: 'antennas',
        name: 'NanoAntennaList',
        component: () => import('./views/materials/NanoAntennaMaterialsListview.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '纳米天线',
                url: '/photon/antennas'
            }]
        }
    },
    {
        path: 'antenna_map',
        name: 'PhotomImportData',
        component: () => import('./views/materials/NanoAntennaLineListView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '纳米天线',
                url: '/photon/antenna_map'
            }]
        }
    },
    {
        path: 'antenna_imp',
        name: 'PhotomImportData',
        component: () => import('./views/materials/NanoAntennaMaterialsImportListView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '纳米天线',
                url: '/photon/antenna_imp'
            }]
        }
    },
    {
        path: 'RadiantCooling',
        name: 'Radiantcooling',
        component: () => import('./views/Radiant/RadiantCooling.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '辐射制冷',
                url: '/photon/RadiantCooling'
            }]
        }
    },
    {
        path: 'ImportRadiantCooling',
        name: 'ImportRadiantCooling',
        component: () => import('./views/Radiant/ImportRadiantCooling.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '辐射制冷',
                url: '/photon/ImportRadiantCooling'
            }]
        }
    }, {
        path: 'database',
        name: 'database',
        component: () => import('./views/database/database.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '数据仓库',
                url: '/photon/database'
            }]
        }
    },
    {
        path: 'InfraredCompatible_transmission',
        name: 'InfraredCompatible_transmission',
        component: () => import('./views/InfraredCompatible/InfraredCompatible.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '红外兼容透射层',
                url: '/photon/InfraredCompatible_transmission'
            }]
        }
    },
    {
        path: 'InfraredCompatible',
        name: 'InfraredCompatible',
        component: () => import('./views/InfraredCompatible/InfraredCompatible.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '红外兼容吸收层',
                url: '/photon/InfraredCompatible'
            }]
        }
    },
    {
        path: 'InfraredCompatible_transmissiondetailed',
        name: 'InfraredCompatible_transmissiondetailed',
        component: () => import('./views/InfraredCompatible/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外兼容透射层-详情',
                url: '/photonm/InfraredCompatible_transmissiondetailed'
            }]
        }
    },
    {
        path: 'InfraredCompatibleDetailAbsorb',
        name: 'InfraredCompatibleDetailAbsorb',
        component: () => import('./views/InfraredCompatible/detailedAbsorb.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外兼容_吸收层详情',
                url: '/photonm/InfraredCompatibleDetailAbsorb'
            }]
        }
    },
    {
        path: 'InfraredCompatible_transmission',
        name: 'InfraredCompatible_transmission',
        component: () => import('./views/InfraredCompatible/InfraredCompatible.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外兼容透射层',
                url: '/photonm/InfraredCompatible_transmission'
            }]
        }
    },
    {
        path: 'PolarizationConversion',
        name: 'PolarizationConversion',
        component: () => import('./views/PolarizationConversion/PolarizationConversion.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '微波宽带相位调控',
                url: '/photon/PolarizationConversion'
            }]
        }
    },
    {
        path: 'ePolarizationConversion',
        name: 'EPolarizationConversion',
        component: () => import('./views/database/PolarizationConversionView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '微波宽带相位调控',
                url: '/photon/PolarizationConversion'
            }]
        }
    },
    {
        path: 'PolarizationConversiondetailed',
        name: 'PolarizationConversiondetailed',
        component: () => import('./views/PolarizationConversion/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波宽带相位调控-详情',
                url: '/photonm/PolarizationConversiondetailed'
            }]
        }
    },
    {
        path: 'UltraWideband',
        name: 'UltraWideband',
        component: () => import('./views/UltraWideband/UltraWideband.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '微波宽带偏振转换',
                url: '/photon/UltraWideband'
            }]
        }
    },
    {
        path: 'eUltraWideband',
        name: 'EUltraWideband',
        component: () => import('./views/database/UltraWidebandView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '微波宽带偏振转换',
                url: '/photon/UltraWideband'
            }]
        }
    },
    {
        path: 'UltraWidebanddetailed',
        name: 'UltraWidebanddetailed',
        component: () => import('./views/UltraWideband/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波宽带偏振转换_详细',
                url: '/photonm/UltraWidebanddetailed'
            }]
        }
    },
    {
        path: 'InfraredAndMicrowaveIntegration',
        name: 'InfraredAndMicrowaveIntegration',
        component: () => import('./views/InfraredAndMicrowaveIntegration/InfraredAndMicrowaveIntegration.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '红外微波一体化',
                url: '/photon/InfraredAndMicrowaveIntegration'
            }]
        }
    },
    {
        path: 'eInfraredAndMicrowaveIntegration',
        name: 'EInfraredAndMicrowaveIntegration',
        component: () => import('./views/database/InfraredAndMicrowaveIntegrationView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '红外微波一体化',
                url: '/photon/InfraredAndMicrowaveIntegration'
            }]
        }
    },
    {
        path: 'InfraredAndMicrowaveIntegrationdetailed',
        name: 'InfraredAndMicrowaveIntegrationdetailed',
        component: () => import('./views/InfraredAndMicrowaveIntegration/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外微波一体化_详情',
                url: '/photonm/InfraredAndMicrowaveIntegrationdetailed'
            }]
        }
    },
    {
        path: 'InfraredPolarizationConversion',
        name: 'InfraredPolarizationConversion',
        component: () => import('./views/InfraredPolarizationConversion/InfraredPolarizationConversion.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '红外偏振转换',
                url: '/photon/InfraredPolarizationConversion'
            }]
        }
    },
    {
        path: 'eInfraredPolarizationConversion',
        name: 'EInfraredPolarizationConversion',
        component: () => import('./views/database/InfraredPolarizationConversionView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '红外偏振转换',
                url: '/photon/InfraredPolarizationConversion'
            }]
        }
    },
    {
        path: 'InfraredPolarizationConversiondetailed',
        name: 'InfraredPolarizationConversiondetailed',
        component: () => import('./views/InfraredPolarizationConversion/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外偏振转换_详细',
                url: '/photonm/InfraredPolarizationConversiondetailed'
            }]
        }
    },
    {
        path: 'InfraredPhaseControl',
        name: 'InfraredPhaseControl',
        component: () => import('./views/InfraredPhaseControl/InfraredPhaseControl.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '红外相位调控',
                url: '/photon/InfraredPhaseControl'
            }]
        }
    },
    {
        path: 'eInfraredPhaseControl',
        name: 'EInfraredPhaseControl',
        component: () => import('./views/database/InfraredPhaseControlView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '红外相位调控',
                url: '/photon/InfraredPhaseControl'
            }]
        }
    },
    {
        path: 'eIntegration',
        name: 'EIntegration',
        component: () => import('./views/database/IntegrationView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波窄带透波及宽带吸波',
                url: '/photonm/Integration'
            }]
        }
    },
    {
        path: 'InfraredPhaseControldetailed',
        name: 'InfraredPhaseControldetailed',
        component: () => import('./views/InfraredPhaseControl/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外相位调控_详细',
                url: '/photonm/InfraredPhaseControldetailed'
            }]
        }
    },
    {
        path: 'InfraredSensor',
        name: 'InfraredSensor',
        component: () => import('./views/InfraredSensor/InfraredSensor.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '红外传感',
                url: '/photon/InfraredSensor'
            }]
        }
    },
    {
        path: 'eInfraredSensor',
        name: 'EInfraredSensor',
        component: () => import('./views/database/InfraredSensorView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '红外传感',
                url: '/photon/InfraredSensor'
            }]
        }
    },
    {
        path: 'InfraredSensordetailed',
        name: 'InfraredSensordetailed',
        component: () => import('./views/InfraredSensor/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外传感_详情',
                url: '/photonm/InfraredSensordetailed'
            }]
        }
    },
    {
        path: 'VisibleLightPhaseControl',
        name: 'VisibleLightPhaseControl',
        component: () => import('./views/VisibleLightPhaseControl/VisibleLightPhaseControl.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '可见光相位调控',
                url: '/photon/VisibleLightPhaseControl'
            }]
        }
    },
    {
        path: 'eVisibleLightPhaseControl',
        name: 'EVisibleLightPhaseControl',
        component: () => import('./views/database/VisibleLightPhaseControlView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '可见光相位调控',
                url: '/photon/VisibleLightPhaseControl'
            }]
        }
    },
    {
        path: 'VisibleLightPhaseControldetailed',
        name: 'VisibleLightPhaseControldetailed',
        component: () => import('./views/VisibleLightPhaseControl/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '可见光相位调控_详情',
                url: '/photon/VisibleLightPhaseControldetailed'
            }]
        }
    },
    {
        path: 'MicrowaveAbsorber',
        name: 'MicrowaveAbsorber',
        component: () => import('./views/MicrowaveAbsorber/MicrowaveAbsorber.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '微波吸波器',
                url: '/photon/MicrowaveAbsorber'
            }]
        }
    },
    {
        path: 'eMicrowaveAbsorber',
        name: 'EMicrowaveAbsorber',
        component: () => import('./views/database/MicrowaveAbsorberView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '微波吸波器',
                url: '/photon/MicrowaveAbsorber'
            }]
        }
    },
    {
        path: 'MicrowaveAbsorberdetailed',
        name: 'MicrowaveAbsorberdetailed',
        component: () => import('./views/MicrowaveAbsorber/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '微波吸波器_详情',
                url: '/photon/MicrowaveAbsorberdetailed'
            }]
        }
    },
    {
        path: 'MicrowaveTransmission',
        name: 'MicrowaveTransmission',
        component: () => import('./views/microwave/microwave.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '微波窄带',
                url: '/photon/MicrowaveTransmission'
            }]
        }
    },
    {
        path: 'eMicrowaveTransmission',
        name: 'EMicrowaveTransmission',
        component: () => import('./views/database/MicrowaveTransmissionView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '微波窄带',
                url: '/photon/MicrowaveTransmission'
            }]
        }
    },
    {
        path: 'MicrowaveTransmission_details',
        name: 'MicrowaveTransmission_details',
        component: () => import('./views/microwave/MicrowaveDetails.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '微波窄带详情',
                url: '/photon/MicrowaveTransmission_details'
            }]
        }
    },
    {
        path: 'diffraction',
        name: 'diffraction',
        component: () => import('./views/diffraction/diffraction.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '衍射组件',
                url: '/photon/diffraction'
            }]
        }
    },
    {
        path: 'ediffraction',
        name: 'Ediffraction',
        component: () => import('./views/database/DiffricationView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photon/home'
            }, {
                name: '衍射组件',
                url: '/photon/diffraction'
            }]
        }
    },{
            path: 'Topology',
            name: 'Topology',
            component: () => import('./views/Topology/Topology.vue'),
            meta: {
                local: [{
                    name: '首页',
                    url: '/photon/home'
                }, {
                    name: '拓扑优化超透镜',
                    url: '/photon/Topology'
                }]
            }
        },
        {
            path: 'eTopology',
            name: 'ETopology',
            component: () => import('./views/database/TopologyView.vue'),
            meta: {
                local: [{
                    name: '首页',
                    url: '/photon/home'
                }, {
                    name: '拓扑优化超透镜',
                    url: '/photon/Topology'
                }]
            }
        },
        {
            path: 'Topologydetailed',
            name: 'Topologydetailed',
            component: () => import('./views/Topology/detailed.vue'),
            meta: {
                local: [{
                    name: '首页',
                    url: '/photon/home'
                }, {
                    name: '拓扑优化超透镜_详情',
                    url: '/photon/Topologydetailed'
                }]
            }
        },

    {
        path: 'test',
        name: 'test',
        component: () => import('./views/curve/index.vue'),
        meta: {}
    },
    ]
};

const managerRoute = {
    path: 'photonm',
    name: 'ManagerPhoton',
    components: {
        header: () => import('./components/headers/PhotonManagerHeader.vue'),
        menu: () => import('./components/menus/PhotonManagerMenu.vue'),
        default: () => import('./components/headers/PhotonManagerLayout.vue'),
        footer: () => import('./components/headers/PhotonManagerFooter.vue'),
    },
    children: [{
        path: '',
        name: "ManagerAtdataHome",
        component: () => import('./views/AtdataHome/AtdataHome.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm'
            }]
        }
    },
    {
        path: 'absorbing',
        name: 'ManagerAbsorbingList',
        component: () => import('./views/materials/ManagerAbsorbingMaterialsListView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '吸波材料',
                url: '/photonm/absorbing'
            }]
        }
    },
    {
        path: 'Integration',
        name: 'Integration',
        component: () => import('./views/Integration/Integration.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波窄带透波及宽带吸波',
                url: '/photonm/Integration'
            }]
        }
    },
    {
        path: 'IntegrationImport',
        name: 'IntegrationImport',
        component: () => import('./views/Integration/Import.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波窄带透波及宽带吸波——导入',
                url: '/photonm/IntegrationImport'
            }]
        }
    },
    {
        path: 'Integrationdetailed',
        name: 'Integrationdetailed',
        component: () => import('./views/Integration/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波窄带透波及宽带吸波——详情',
                url: '/photonm/Integrationdetailed'
            }]
        }
    },
    {
        path: 'ImportRadiantCooling',
        name: 'ImportRadiantcooling',
        component: () => import('./views/Radiant/ImportRadiantCooling.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '辐射制冷',
                url: '/photonm/ImportRadiantCooling'
            }]
        }
    },
    {
        path: 'MicrowaveTransmission',
        name: 'MicrowaveTransmission',
        component: () => import('./views/microwave/microwave.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波窄带',
                url: '/photonm/MicrowaveTransmission'
            }]
        }
    },
    {
        path: 'MicrowaveTransmission_details',
        name: 'MicrowaveTransmission_details',
        component: () => import('./views/microwave/MicrowaveDetails.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波窄带详情',
                url: '/photonm/MicrowaveTransmission_details'
            }]
        }
    },
    {
        path: 'MicrowaveTransmissionImport',
        name: 'MicrowaveTransmissionImport',
        component: () => import('./views/microwave/Import.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波窄带导入',
                url: '/photonm/MicrowaveTransmissionImport'
            }]
        }
    },
    {
        path: 'users',
        name: 'PhotonUsersManageList',
        component: () => import('./views/user/ManageUserListView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '系统用户',
                url: '/photonm/users'
            }]
        }
    },
    {
        path: 'antennas',
        name: 'AntennaManageList',
        component: () => import('./views/materials/ManageNanoAntennoMaterialsListView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '纳米天线',
                url: '/photonm/antennas'
            }]
        }
    },
    {
        path: 'antenna_imp',
        name: 'ManagePhotomImportList',
        component: () => import('./views/materials/NanoAntennaMaterialsImportListView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '纳米天线',
                url: '/photonm/antenna_imp'
            }]
        }
    },
    {
        path: 'antenna_map',
        name: 'ManagePhotomImportData',
        component: () => import('./views/materials/NanoAntennaLineListView.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '纳米天线',
                url: '/photonm/antenna_map'
            }]
        }
    },
    {
        path: 'Form_details',
        name: 'ManagePhotomFormdetails',
        component: () => import('./views/materials/FormDetails.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '详情',
                url: '/photonm/FormDetails'
            }]
        }
    },
    {
        path: 'csvConversion',
        name: 'csvconversion',
        component: () => import('./views/csvConversion/csvConversion.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '详情',
                url: '/photonm/csvConversion'
            }]
        }
    },
    {
        path: 'InfraredCompatible',
        name: 'InfraredCompatible',
        component: () => import('./views/InfraredCompatible/absorb.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外兼容',
                url: '/photonm/InfraredCompatible'
            }]
        }
    },
    {
        path: 'InfraredCompatibleImport',
        name: 'InfraredCompatibleImport',
        component: () => import('./views/InfraredCompatible/Import.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外兼容_透射层导入',
                url: '/photonm/InfraredCompatibleImport'
            }]
        }
    },
    {
        path: 'InfraredCompatibleImportAbsorb',
        name: 'InfraredCompatibleImportAbsorb',
        component: () => import('./views/InfraredCompatible/ImportAbsorb.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外兼容_吸收层导入',
                url: '/photonm/InfraredCompatibleImportAbsorb'
            }]
        }
    },
    {
        path: 'InfraredCompatibleDetailAbsorb',
        name: 'InfraredCompatibleDetailAbsorb',
        component: () => import('./views/InfraredCompatible/detailedAbsorb.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外兼容_吸收层详情',
                url: '/photonm/InfraredCompatibleDetailAbsorb'
            }]
        }
    },
    {
        path: 'InfraredCompatible_transmission',
        name: 'InfraredCompatible_transmission',
        component: () => import('./views/InfraredCompatible/InfraredCompatible.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外兼容透射层',
                url: '/photonm/InfraredCompatible_transmission'
            }]
        }
    },
    {
        path: 'InfraredCompatible_transmissiondetailed',
        name: 'InfraredCompatible_transmissiondetailed',
        component: () => import('./views/InfraredCompatible/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外兼容透射层-详情',
                url: '/photonm/InfraredCompatible_transmissiondetailed'
            }]
        }
    },
    {
        path: 'PolarizationConversion',
        name: 'PolarizationConversion',
        component: () => import('./views/PolarizationConversion/PolarizationConversion.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波宽带相位调控',
                url: '/photonm/PolarizationConversion'
            }]
        }
    }, {
        path: 'PolarizationConversionImport',
        name: 'PolarizationConversionImport',
        component: () => import('./views/PolarizationConversion/Import.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波宽带相位调控-导入',
                url: '/photonm/PolarizationConversionImport'
            }]
        }
    }, {
        path: 'PolarizationConversiondetailed',
        name: 'PolarizationConversiondetailed',
        component: () => import('./views/PolarizationConversion/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波宽带相位调控-详情',
                url: '/photonm/PolarizationConversiondetailed'
            }]
        }
    }, {
        path: 'UltraWideband',
        name: 'UltraWideband',
        component: () => import('./views/UltraWideband/UltraWideband.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波宽带偏振转换',
                url: '/photonm/UltraWideband'
            }]
        }
    }, {
        path: 'UltraWidebandImport',
        name: 'UltraWidebandImport',
        component: () => import('./views/UltraWideband/Import.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波宽带偏振转换_导入',
                url: '/photonm/UltraWidebandImport'
            }]
        }
    }, {
        path: 'UltraWidebanddetailed',
        name: 'UltraWidebanddetailed',
        component: () => import('./views/UltraWideband/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波宽带偏振转换_详细',
                url: '/photonm/UltraWidebanddetailed'
            }]
        }
    }, {
        path: 'InfraredAndMicrowaveIntegration',
        name: 'InfraredAndMicrowaveIntegration',
        component: () => import('./views/InfraredAndMicrowaveIntegration/InfraredAndMicrowaveIntegration.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外微波一体化',
                url: '/photonm/InfraredAndMicrowaveIntegration'
            }]
        }
    },
    {
        path: 'InfraredAndMicrowaveIntegrationImport',
        name: 'InfraredAndMicrowaveIntegrationImport',
        component: () => import('./views/InfraredAndMicrowaveIntegration/Import.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外微波一体化_导入',
                url: '/photonm/InfraredAndMicrowaveIntegrationImport'
            }]
        }
    },
    {
        path: 'InfraredAndMicrowaveIntegrationdetailed',
        name: 'InfraredAndMicrowaveIntegrationdetailed',
        component: () => import('./views/InfraredAndMicrowaveIntegration/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外微波一体化_详情',
                url: '/photonm/InfraredAndMicrowaveIntegrationdetailed'
            }]
        }
    },
    {
        path: 'InfraredPolarizationConversion',
        name: 'InfraredPolarizationConversion',
        component: () => import('./views/InfraredPolarizationConversion/InfraredPolarizationConversion.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外偏振转换 ',
                url: '/photonm/InfraredPolarizationConversion'
            }]
        }
    }, {
        path: 'InfraredPolarizationConversionImport',
        name: 'InfraredPolarizationConversionImport',
        component: () => import('./views/InfraredPolarizationConversion/Import.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外偏振转换_导入',
                url: '/photonm/InfraredPolarizationConversionImport'
            }]
        }
    }, {
        path: 'InfraredPolarizationConversiondetailed',
        name: 'InfraredPolarizationConversiondetailed',
        component: () => import('./views/InfraredPolarizationConversion/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外偏振转换_详细',
                url: '/photonm/InfraredPolarizationConversiondetailed'
            }]
        }
    }, {
        path: 'InfraredPhaseControl',
        name: 'InfraredPhaseControl',
        component: () => import('./views/InfraredPhaseControl/InfraredPhaseControl.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外相位调控',
                url: '/photonm/InfraredPhaseControl'
            }]
        }
    }, {
        path: 'InfraredPhaseControlImport',
        name: 'InfraredPhaseControlImport',
        component: () => import('./views/InfraredPhaseControl/Import.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外相位调控_导入',
                url: '/photonm/InfraredPhaseControlImport'
            }]
        }
    }, {
        path: 'InfraredPhaseControldetailed',
        name: 'InfraredPhaseControldetailed',
        component: () => import('./views/InfraredPhaseControl/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外相位调控_详细',
                url: '/photonm/InfraredPhaseControldetailed'
            }]
        }
    }, {
        path: 'InfraredSensor',
        name: 'InfraredSensor',
        component: () => import('./views/InfraredSensor/InfraredSensor.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外传感',
                url: '/photonm/InfraredSensor'
            }]
        }
    },
    {
        path: 'InfraredSensordetailed',
        name: 'InfraredSensordetailed',
        component: () => import('./views/InfraredSensor/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外传感_详情',
                url: '/photonm/InfraredSensordetailed'
            }]
        }
    }, {
        path: 'InfraredSensorImport',
        name: 'InfraredSensorImport',
        component: () => import('./views/InfraredSensor/Import.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '红外传感_导入',
                url: '/photonm/InfraredSensorImport'
            }]
        }
    }, {
        path: 'VisibleLightPhaseControl',
        name: 'VisibleLightPhaseControl',
        component: () => import('./views/VisibleLightPhaseControl/VisibleLightPhaseControl.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '可见光相位调控',
                url: '/photonm/VisibleLightPhaseControl'
            }]
        }
    }, {
        path: 'VisibleLightPhaseControlImport',
        name: 'VisibleLightPhaseControlImport',
        component: () => import('./views/VisibleLightPhaseControl/Import.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '可见光相位调控_导入',
                url: '/photonm/VisibleLightPhaseControlImport'
            }]
        }
    },
    {
        path: 'VisibleLightPhaseControldetailed',
        name: 'VisibleLightPhaseControldetailed',
        component: () => import('./views/VisibleLightPhaseControl/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '可见光相位调控_详情',
                url: '/photonm/VisibleLightPhaseControldetailed'
            }]
        }
    }, {
        path: 'MicrowaveAbsorber',
        name: 'MicrowaveAbsorber',
        component: () => import('./views/MicrowaveAbsorber/MicrowaveAbsorber.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波吸波器',
                url: '/photonm/MicrowaveAbsorber'
            }]
        }
    }, {
        path: 'MicrowaveAbsorberImport',
        name: 'MicrowaveAbsorberImport',
        component: () => import('./views/MicrowaveAbsorber/Import.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波吸波器_导入',
                url: '/photonm/MicrowaveAbsorberImport'
            }]
        }
    }, {
        path: 'MicrowaveAbsorberdetailed',
        name: 'MicrowaveAbsorberdetailed',
        component: () => import('./views/MicrowaveAbsorber/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '微波吸波器_详情',
                url: '/photonm/MicrowaveAbsorberdetailed'
            }]
        }
    },
    {
        path: 'diffraction',
        name: 'diffraction',
        component: () => import('./views/diffraction/diffraction.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '衍射组件',
                url: '/photonm/diffraction'
            }]
        }
    },
    {
        path: 'diffractionimport',
        name: 'diffractionimport',
        component: () => import('./views/diffraction/Import.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '衍射组件_导入',
                url: '/photonm/diffractionimport'
            }]
        }
    }, {
        path: 'diffractiondetailed',
        name: 'diffractiondetailed',
        component: () => import('./views/diffraction/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '衍射组件_详情',
                url: '/photonm/diffractiondetailed'
            }]
        }
    },

    //配置路由
    {
        path: 'Topology',
        name: 'Topology',
        component: () => import('./views/Topology/Topology.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '拓扑优化超透镜',
                url: '/photonm/Topology'
            }]
        }
    }, {
        path: 'TopologyImport',
        name: 'TopologyImport',
        component: () => import('./views/Topology/Import.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '拓扑优化超透镜_导入',
                url: '/photonm/TopologyImport'
            }]
        }
    }, {
        path: 'Topologydetailed',
        name: 'Topologydetailed',
        component: () => import('./views/Topology/detailed.vue'),
        meta: {
            local: [{
                name: '首页',
                url: '/photonm/home'
            }, {
                name: '拓扑优化超透镜_详情',
                url: '/photonm/Topologydetailed'
            }]
        }
    }
    ]
};

const exp = {
    home: homeRoute,
    manager: managerRoute,
};

export default exp;
