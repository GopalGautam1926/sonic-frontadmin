import { Chip as MuiChip } from "@material-ui/core";
import withAppColor from '../hoc/withAppColors';
import { withStyles } from '@material-ui/core/styles';

const Chip = withAppColor(MuiChip);

/**
 * This will accept all props of Chip from material UI like size, label, avatar, clickable, variant ect.
 */
const Badge = withStyles({
    root: {
      height:15,
      padding:0,
    }
  })(Chip);
export default Badge
