import React from "react";
import { TableCell, TableFooter, TablePagination, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const defaultFooterStyles = {
};

const CustomFooter = (props) => {
    const { count, classes, textLabels, rowsPerPage, page } = props;

    const handleRowChange = (event) => {
        props.changeRowsPerPage(event.target.value);
    };

    const handlePageChange = (_, page) => {
        props.changePage(page);
    };


    return (
        <TableFooter>
            <TableRow>
                <TableCell style={{ display: 'flex', justifyContent: 'flex-end', padding: '0px 24px 0px 24px' }} colSpan={1000}>
                    <TablePagination
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        labelRowsPerPage={textLabels.rowsPerPage}
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${textLabels.displayRows} ${count}`}
                        backIconButtonProps={{
                            'aria-label': textLabels.previous,
                        }}
                        nextIconButtonProps={{
                            'aria-label': textLabels.next,
                        }}
                        rowsPerPageOptions={[10, 20, 100]}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handleRowChange}
                    />
                </TableCell>
            </TableRow>
        </TableFooter>
    );
}

export default withStyles(defaultFooterStyles, { name: "CustomFooter" })(CustomFooter);