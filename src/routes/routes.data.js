import DashboardIcon from "@material-ui/icons/Dashboard";
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import RadioIcon from '@material-ui/icons/Radio';
import PeopleIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';
import Dashboard from "../pages/Dashboard/Dashboard";
import LicenseKeys from '../pages/KeysManagement/LicenseKeys/LicenseKeys';
import ApiKeys from '../pages/KeysManagement/ApiKeys/ApiKeys';
import ViewLicenseKey from '../pages/KeysManagement/LicenseKeys/components/ViewLicenseKey';
import RadioStation from '../pages/RadioManagement/RadioStation/RadioStation';
import { observer } from 'mobx-react';
import ViewApiKey from '../pages/KeysManagement/ApiKeys/components/ViewApiKey';
import ViewRadioStation from "../pages/RadioManagement/RadioStation/components/ViewRadioStation";
import ViewRelease from "../pages/ReleaseManagement/components/ViewReleases";
import RegisterUser from '../pages/UserManagement/components/RegisterUser';
import AddMonitorSubscriptionToUser from "../pages/UserManagement/components/AddMonitorSubscriptionToUser";
import Plays from "../pages/SonicKeyManagement/Plays";
import Companies from "../pages/CompanyManagement/Companies";
import Users from "../pages/UserManagement/Users";
import Group from "../pages/GroupManagement/Group";

export const routesData = [
  {
    path: "/dashboard",
    icon: <DashboardIcon />,
    sidebar: true,
    name: "Dashboard",
    component: observer(Dashboard),
    layout: "/admin",
    key: "dashboard" //unique to identify
  },
  {
    icon: <BusinessIcon />,
    name: "Companies",
    sidebar: true,
    parentPath: '/company-management',
    layout: "/admin",
    routes: [
      {
        path: "/company-management/company",
        name: "Companies",
        component: observer(Companies),
        exact: true,
        sidebar: true,
        layout: "/admin",
        key: "cm_company",
        // routes: [
        //   {
        //     exact: true,
        //     sidebar: false,
        //     path: "/company-management/company/view/:companyId",
        //     name: "View Company",
        //     component: ViewLicenseKey,
        //     layout: "/admin",
        //     key: "cm_company_view",
        //   },
        // ]
      }
    ],
  },
  {
    icon: <PeopleIcon />,
    name: "Groups",
    sidebar: true,
    parentPath: '/groups-management',
    layout: "/admin",
    routes: [
      {
        path: "/groups-management/groups",
        name: "Groups",
        component: observer(Group),
        exact: true,
        sidebar: true,
        layout: "/admin",
        key: "gm_groups",
        // routes: [
        //   {
        //     path: "/users-management/register-new-user",
        //     name: "Register New User",
        //     component: RegisterUser,
        //     exact: true,
        //     sidebar: false,
        //     layout: "/admin",
        //     key: "um_registernewuser"
        //   }
        // ]
      }
    ]
  },
  {
    icon: <PeopleIcon />,
    name: "Users",
    sidebar: true,
    parentPath: '/users-management',
    layout: "/admin",
    routes: [
      {
        path: "/users-management/users",
        name: "Users",
        component: observer(Users),
        exact: true,
        sidebar: true,
        layout: "/admin",
        key: "um_users",
        routes: [
          {
            path: "/users-management/register-new-user",
            name: "Register New User",
            component: RegisterUser,
            exact: true,
            sidebar: false,
            layout: "/admin",
            key: "um_registernewuser"
          }
        ]
      },
      // {
      //   path: "/users-management/add-monitoring-subscription-to-user",
      //   name: "Add Subscription",
      //   component: observer(AddMonitorSubscriptionToUser),
      //   exact: true,
      //   sidebar: true,
      //   layout: "/admin",
      //   key: "um_add_monitoring_subscription_to_user"
      // }
    ]
  },
  {
    icon: <VpnKeyIcon />,
    name: "SonicKeys",
    sidebar: true,
    parentPath: '/sonickeys-management',
    layout: "/admin",
    routes: [
      {
        path: "/sonickeys-management/plays",
        name: "Plays",
        component: observer(Plays),
        exact: true,
        sidebar: true,
        layout: "/admin",
        key: "sm_sonickeys",
        // routes: [
        //   {
        //     exact: true,
        //     sidebar: false,
        //     path: "/sonickeys-management/sonickeys/view/:sonickeyId",
        //     name: "View Sonickey",
        //     component: ViewLicenseKey,
        //     layout: "/admin",
        //     key: "sm_sonickeys_view",
        //   },
        // ]
      }
    ],
  },
  {
    icon: <RadioIcon />,
    name: "Radios",
    sidebar: true,
    parentPath: '/radio-management',
    layout: "/admin",
    routes: [
      {
        path: "/radio-management/radio-station",
        name: "Radio Station",
        component: observer(RadioStation),
        exact: true,
        sidebar: true,
        layout: "/admin",
        key: "radio_station",
        routes: [
          {
            exact: true,
            sidebar: false,
            path: "/radio-management/radio-station/view/:radioStationId",
            name: "View Radio Station",
            component: ViewRadioStation,
            layout: "/admin",
            key: "radiostation_view",
          },
        ]
      },
    ],
  },
  {
    icon: <VpnKeyIcon />,
    name: "Licensing",
    sidebar: true,
    parentPath: '/licenses-management',
    layout: "/admin",
    routes: [
      {
        path: "/licenses-management/license-keys",
        name: "Licenses",
        component: observer(LicenseKeys),
        exact: true,
        sidebar: true,
        layout: "/admin",
        key: "km_licensekeys",
        routes: [
          {
            exact: true,
            sidebar: false,
            path: "/licenses-management/license-keys/view/:licenseId",
            name: "View License",
            component: ViewLicenseKey,
            layout: "/admin",
            key: "km_licensekeys_view",
          },
        ]
      },
      {
        path: "/licenses-management/api-keys",
        name: "Api Keys",
        exact: true,
        component: observer(ApiKeys),
        sidebar: true,
        layout: "/admin",
        key: "km_apikeys",
        routes: [
          {
            exact: true,
            sidebar: false,
            path: "/licenses-management/api-keys/view/:apiId",
            name: "View Api Key",
            component: observer(ViewApiKey),
            layout: "/admin",
            key: "km_apikeys_view",
          },
        ]
      },
    ],
  },
  {
    icon: <NewReleasesIcon />,
    name: "Release",
    sidebar: true,
    parentPath: '/release',
    layout: "/admin",
    routes: [
      {
        path: "/release/view",
        name: "View",
       component: observer(ViewRelease),
        exact: true,
        sidebar: true,
        layout: "/admin",
        key: "view_release"
      },
    ],
  }
];


/**
 *Special function that will flat the nested array of object into top level route array of object
 * @param {Array} data
 * @returns {[]}
 */
export const flattenRoutes = (data = routesData) => {
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
export const getRouteNames = () => {
  var result = flattenRoutes().reduce(function (map, obj) {
    map[obj.key] = obj.layout + obj.path;
    return map;
  }, {})
  return result
}
