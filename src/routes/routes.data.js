import DashboardIcon from "@material-ui/icons/Dashboard";
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import RadioIcon from '@material-ui/icons/Radio';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BusinessIcon from '@material-ui/icons/Business';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import Dashboard from "../pages/Dashboard/Dashboard";
import LicenseKeys from '../pages/KeysManagement/LicenseKeys/LicenseKeys';
import ApiKeys from '../pages/KeysManagement/ApiKeys/ApiKeys';
import ViewLicenseKey from '../pages/KeysManagement/LicenseKeys/components/ViewLicenseKey';
import RadioStation from '../pages/RadioManagement/RadioStation/RadioStation';
import { observer } from 'mobx-react';
import ViewApiKey from '../pages/KeysManagement/ApiKeys/components/ViewApiKey';
import ViewRadioStation from "../pages/RadioManagement/RadioStation/components/ViewRadioStation";
import Version from "../pages/ReleaseManagement/Version";
import Plays from "../pages/SonicKeyManagement/Plays/Plays";
import Companies from "../pages/CompanyManagement/Companies";
import Users from "../pages/UserManagement/Users";
import Encoded from "../pages/SonicKeyManagement/Encoded/Encoded";
import ViewUsers from "../pages/UserManagement/components/ViewUsers";
import ViewCompany from "../pages/CompanyManagement/components/ViewCompany";
import ViewVersion from '../pages/ReleaseManagement/components/ViewVersion';
import Partners from "../pages/PartnerManagement/Partners";
import ViewPartner from "../pages/PartnerManagement/components/ViewPartner";
import Tracks from "../pages/TracksManagement/Tracks";

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
    icon: <PersonAddIcon />,
    name: "Partners",
    sidebar: true,
    parentPath: '/partner-management',
    layout: "/admin",
    routes: [
      {
        path: "/partner-management/partner",
        name: "Partners",
        component: observer(Partners),
        exact: true,
        sidebar: true,
        layout: "/admin",
        key: "cm_partner",
        routes: [
          {
            exact: true,
            sidebar: false,
            path: "/partner-management/partner/view/:partnerId",
            name: "View Partner",
            component: ViewPartner,
            layout: "/admin",
            key: "cm_partner_view",
          },
        ]
      }
    ],
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
        routes: [
          {
            exact: true,
            sidebar: false,
            path: "/company-management/company/view/:companyId",
            name: "View Company",
            component: ViewCompany,
            layout: "/admin",
            key: "cm_company_view",
          },
        ]
      }
    ],
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
            exact: true,
            sidebar: false,
            path: "/users-management/users/view/:userId",
            name: "View Users",
            component: ViewUsers,
            layout: "/admin",
            key: "um_users_view",
          },
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
        path: "/sonickeys-management/encoded",
        name: "Encodes",
        component: observer(Encoded),
        exact: true,
        sidebar: true,
        layout: "/admin",
        key: "sm_encoded",
      },
      {
        path: "/sonickeys-management/plays",
        name: "Plays",
        component: observer(Plays),
        exact: true,
        sidebar: true,
        layout: "/admin",
        key: "sm_plays",
      }
    ],
  },
  {
    path: "/tracks",
    icon: <AudiotrackIcon />,
    sidebar: true,
    name: "Tracks",
    component: observer(Tracks),
    layout: "/admin",
    key: "tracks" //unique to identify
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
    name: "LibraryEncoder",
    sidebar: true,
    parentPath: '/release-management',
    layout: "/admin",
    routes: [
      {
        path: "/release-management/release",
        name: "Releases",
        component: observer(Version),
        exact: true,
        sidebar: true,
        layout: "/admin",
        key: "km_version",
        routes: [
          {
            exact: true,
            sidebar: false,
            path: "/release-management/release/view/:versionId",
            name: "View Releases",
            component: ViewVersion,
            layout: "/admin",
            key: "km_version_view",
          },
        ]
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
