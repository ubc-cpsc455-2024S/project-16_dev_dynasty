import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton, Tooltip, Card, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import PdfThumbnail from '../pdf/PdfThumbnail';

const DocumentCard = ({
  document,
  onEdit,
  onDelete,
  onDownload,
  onView,
  titleColor = 'white',
  subtitleColor = '#dbdbdb',
  leftSideTitle = 'Type',
  leftSideValue,
  leftSideColor = 'white',
  rightSideTitle = 'Date',
  rightSideValue,
  rightSideColor = 'white',
  backgroundColor =  '#5C4D4D',
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 310,
        height: 180,
        borderRadius: 5,
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'visible',
        backgroundColor,
        marginLeft: '80px',
      }}
    >
      <Box
        onClick={onView}
        sx={{
          position: 'absolute',
          top: -16,
          left: -56,
          width: 125,
          height: 180,
          zIndex: 1,
          borderRadius: 5,
          overflow: 'hidden',
          boxShadow: '0 10px 6px rgba(0,0,0,0.3)',
          backgroundColor: 'white',
          cursor: 'pointer', 
          '&:hover': {
            boxShadow: '0 10px 12px rgba(0,0,0,0.5)', 
          },
        }}
      >
        <PdfThumbnail url={document.fileUrl} width={125} height={180} />
      </Box>
      <Box
        onClick={onView}
        sx={{
          flexGrow: 1,
          paddingLeft: '30%', 
          paddingRight: '20%',
          paddingTop: '0%',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          height: '70%', 
          maxHeight: '100%',
          maxWidth: '50%',
          cursor: 'pointer', 
            '&:hover': {
              textDecoration: 'underline', 
            }
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: titleColor,
            fontWeight: 'bold',
            mb: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
          title={document.title} 
        >
          {document.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: subtitleColor,
            fontWeight: '400',
            mb: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
          title={document.description} 
        >
          {document.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography sx={{ fontSize: 11, color: leftSideColor }}>{leftSideTitle}</Typography>
            <Typography sx={{ fontSize: 12, marginTop: 1, fontWeight: 'bold', color: leftSideColor }}>
              {leftSideValue}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 1, height: 35, backgroundColor: '#c4c4c4', opacity: 0.5, marginX: 2 }} />
            <Box>
              <Typography sx={{ fontSize: 11, color: rightSideColor }}>{rightSideTitle}</Typography>
              <Typography sx={{ fontSize: 12, marginTop: 1, fontWeight: 'bold', color: rightSideColor }}>
                {rightSideValue}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <CardActions
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Tooltip title="View Document">
          <IconButton size="small" onClick={onView}>
            <ZoomInIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Document">
          <IconButton size="small" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Document">
          <IconButton onClick={onDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download Document">
          <IconButton onClick={onDownload}>
            <DownloadIcon sx={{ color: 'primary.main' }} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

DocumentCard.propTypes = {
  document: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  titleColor: PropTypes.string,
  onView: PropTypes.func.isRequired,
  subtitleColor: PropTypes.string,
  leftSideTitle: PropTypes.string,
  leftSideValue: PropTypes.string.isRequired,
  leftSideColor: PropTypes.string,
  rightSideTitle: PropTypes.string,
  rightSideValue: PropTypes.string.isRequired,
  rightSideColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default DocumentCard;
