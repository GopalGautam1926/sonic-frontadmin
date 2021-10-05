import DashboardIcon from "@material-ui/icons/Dashboard";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import RadioIcon from '@material-ui/icons/Radio';
import Dashboard from "../pages/Dashboard/Dashboard";
import LicenseKeys from '../pages/KeysManagement/LicenseKeys/LicenseKeys';
import ApiKeys from '../pages/KeysManagement/ApiKeys/ApiKeys';
import ViewLicenseKey from '../pages/KeysManagement/LicenseKeys/components/ViewLicenseKey';
import RadioStation from '../pages/RadioManagement/RadioStation/RadioStation';
import { observer } from 'mobx-react';
import ViewApiKey from '../pages/KeysManagement/ApiKeys/components/ViewApiKey';

export const routesData = [
  {
    path: "/dashboard",
    icon: <DashboardIcon />,
    sidebar:true,
    name: "Dashboard",
    component: observer(Dashboard),
    layout: "/admin",
    key:"dashboard" //unique to identify
  },
  {
    icon: <VpnKeyIcon />,
    name: "Keys Management",
    sidebar:true,
    parentPath:'/keys-management',
    layout: "/admin",
    routes: [
      {
        path: "/keys-management/license-keys",
        name: "Licenses",
        component: observer(LicenseKeys),
        exact:true,
        sidebar:true,
        layout: "/admin",
        key:"km_licensekeys",
        routes:[
          {
            exact:true,
            sidebar:false,
            path: "/keys-management/license-keys/view/:licenseId",
            name: "View License",
            component: ViewLicenseKey,
            layout: "/admin",
            key:"km_licensekeys_view", 
          },
        ]
      },
      {
        path: "/keys-management/api-keys",
        name: "Api Keys",
        exact:true,
        component: observer(ApiKeys),
        sidebar:true,
        layout: "/admin",
        key:"km_apikeys",
        routes:[
          {
            exact:true,
            sidebar:false,
            path: "/keys-management/api-keys/view/:apiId",
            name: "View Api Key",
            component: observer(ViewApiKey),
            layout: "/admin",
            key:"km_apikeys_view", 
          },
        ]
      },
    ],
  },
  {
    icon: <RadioIcon />,
    name: "Radio Management",
    sidebar:true,
    parentPath:'/radio-management',
    layout: "/admin",
    routes: [
      {
        path: "/radio-management/radio-station",
        name: "Radio Station",
        component: observer(RadioStation),
        exact:true,
        sidebar:true,
        layout: "/admin",
        key:"radio_station",
        routes:[
          {
            exact:true,
            sidebar:false,
            path: "/radio-management/radio-station/view/:licenseId",
            name: "Radio Station",
            component: ViewLicenseKey,
            layout: "/admin",
            key:"radiostation_view", 
          },
        ]
      },
    ],
  },
];


/**
 *Special function that will flat the nested array of object into top level route array of object
 * @param {Array} data
 * @returns {[]}
 */
 export const flattenRoutes = (data=routesData) => {
    return data.reduce((r, { routes, ...rest }) => {
      if (rest.path) {
        r.push(rest);
      }
      if (routes) r.push(...flattenRoutes(routes));
      return r;
    }, []);
  };

/**
 * This will returnns routes in array
 * format: 
    {
      "key":"path"
    }
 */
export const getRouteNames = ()=>{
    var result = flattenRoutes().reduce(function(map, obj) {
        map[obj.key] = obj.layout + obj.path;
        return map;
    }, {})
    return result
}
