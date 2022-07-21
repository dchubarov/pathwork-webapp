import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Box,
    Collapse,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {ArrowDropDown as CollapseIcon, ArrowRight as ExpandIcon} from "@mui/icons-material";

import {formatDateTime, relativeTimeT} from "@utils/datetime";
import SharingStatus from "@components/SharingStatus";
import {Optional} from "@utils/optional";
import {CardDto} from "../model";

const ColorLabel = styled(Box)(({theme}) => ({
    width: "1em",
    height: "1em",
    borderRadius: "1em",
    border: `1px solid ${theme.palette.divider}`
}));

const BrowserList: React.FC<{ data: CardDto[] }> = ({data}) => {
    const [expandedRecordId, setExpandedRecordId] = useState<string | undefined>();
    const extras = ["footer-left", "footer-right"];
    const {t} = useTranslation();

    const handleExpandOrCollapse = (card: CardDto) => {
        setExpandedRecordId(expandedRecordId !== card.record.id ? card.record.id : undefined);
    }

    const cardDetails = (card: CardDto) => {
        return Optional.of(card.layout.find(el => el.element === "detail"))
            .map(el => el.field.value?.single)
            .orUndefined();
    }

    return (
        <TableContainer sx={{mt: 1, mb: 1}}>
            <Table size="small" width="100%">
                <TableHead>
                    <TableRow>
                        <TableCell width="3%"/>
                        <TableCell width="3%"/>
                        <TableCell width="10%">Type / ID</TableCell>
                        <TableCell width="32%">Caption</TableCell>
                        <TableCell width="30%" colSpan={extras.length}>Extras</TableCell>
                        <TableCell width="22%">Author / Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((card, index) =>
                        <React.Fragment key={`row-${index + 1}`}>
                            <TableRow hover sx={{'& > *': {borderBottom: 'unset'}}}>
                                <TableCell>
                                    <IconButton size="small"
                                                disabled={cardDetails(card) === undefined}
                                                onClick={() => handleExpandOrCollapse(card)}>
                                        {expandedRecordId === card.record.id ?
                                            <CollapseIcon fontSize="inherit"/> :
                                            <ExpandIcon fontSize="inherit"/>}
                                    </IconButton>
                                </TableCell>

                                <TableCell>
                                    {card.record.tint ?
                                        <ColorLabel sx={{
                                            backgroundColor: card.record.tint,
                                            border: `1px solid ${card.record.tint}`
                                        }}/> :
                                        <ColorLabel/>}
                                </TableCell>

                                <TableCell>
                                    <Typography variant="body2">{card.record.template.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">#{card.record.id}</Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography variant="body2" noWrap>
                                        {card.layout.find(el => el.element === "caption")?.field.value?.single || "–"}
                                    </Typography>
                                </TableCell>

                                {extras.map(i => card.layout.find(el => el.element === i)).map((el, index) =>
                                    <TableCell key={`extras-${index + 1}`}>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {el?.field.template?.label || el?.field.name || ""}
                                        </Typography>
                                        <Typography variant="body2" noWrap>
                                            {el?.field.value?.single}
                                        </Typography>
                                    </TableCell>)}
                                <TableCell>
                                    <SharingStatus user={card.record.created.user}/>
                                    <Typography variant="body2" color="text.secondary"
                                                title={formatDateTime(card.record.created.timestamp)}>
                                        {relativeTimeT(t, card.record.created.timestamp, undefined, "short")}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{paddingBottom: 0, paddingTop: 0}}/>
                                <TableCell style={{paddingBottom: 0, paddingTop: 0}}/>
                                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={extras.length + 4}>
                                    <Collapse in={expandedRecordId === card.record.id} timeout="auto" unmountOnExit>
                                        <Typography variant="body2" mt={1} mb={1} color="text.secondary">
                                            {cardDetails(card)}
                                        </Typography>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BrowserList;