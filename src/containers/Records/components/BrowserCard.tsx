import React from "react";
import {
    alpha,
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    colors,
    Divider,
    Link,
    Typography
} from "@mui/material";
import {CardDto, CardLayoutDto, CardLayoutElement, FieldDto} from "@model/records";
import TagArray from "@components/TagArray";
import StaffAvatar from "@components/StaffAvatar";
import {formatDateTime, relativeTimeT} from "@utils/datetime";
import {Optional} from "@utils/optional";
import {clipText} from "@utils/text";
import LinkBehavior from "@components/LinkBehavior";

interface Props {
    data: CardDto;
    clip?: number;
    fullSize?: boolean;
}

const BrowserCard: React.FC<Props> = ({data, clip, fullSize}) => {
    const byLayout = (role: CardLayoutElement, elements: CardLayoutDto[] = data.layout): Optional<FieldDto> => {
        return Optional.of(elements.find(e => e.element === role)).map(e => e.field);
    }

    const cardTitle = <Typography variant="body2" noWrap>
        <Link component={LinkBehavior} href="#" underline="always" color="text.primary">
            {data.record.created.user}
        </Link>
        &nbsp;
        <span title={formatDateTime(data.record.created.timestamp)}>
            {relativeTimeT(data.record.created.timestamp, undefined, "short")}
        </span>
    </Typography>;

    const cardSubheader = <span title={`#${data.record.id}`}>{data.record.template.name}</span>;

    const footerElements = data.layout.filter(e => e.element === "footer-left" || e.element === "footer-right");

    return (
        <Card sx={{
            backgroundColor: alpha(data.record.tint || colors.common.white, 0.1),
            height: fullSize ? "100%" : undefined,
        }}>
            <CardActionArea>
                <CardHeader avatar={<StaffAvatar name={data.record.created.user} kind="user" size="large"/>}
                            title={cardTitle} subheader={cardSubheader}/>

                <CardContent sx={{pt: 0}}>
                    {byLayout("caption").map(f =>
                        <Typography variant="h5" noWrap>
                            {f.value?.single}
                        </Typography>).orUndefined()}

                    <TagArray tags={data.record.tags}/>

                    {byLayout("detail").map(f =>
                        <Typography variant="body2">
                            {clipText(f.value?.single, clip || -1, false)}
                        </Typography>
                    ).orUndefined()}

                    {footerElements.length > 0 && <>
                        <Divider sx={{mt: 1}}/>
                        <Box sx={{display: "flex", mt: 1}}>
                            {byLayout("footer-left", footerElements).map(f =>
                                <Box>
                                    <Typography variant="caption"
                                                color="text.secondary">{f.template?.label}</Typography>
                                    <Typography variant="body2">{f.value?.single}</Typography>
                                </Box>
                            ).orUndefined()}

                            <Box sx={{flexGrow: 1}}/>

                            {byLayout("footer-right", footerElements).map(f =>
                                <Box sx={{textAlign: "right"}}>
                                    <Typography variant="caption"
                                                color="text.secondary">{f.template?.label}</Typography>
                                    <Typography variant="body2">{f.value?.single}</Typography>
                                </Box>
                            ).orUndefined()}
                        </Box>
                    </>}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default BrowserCard;
