import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Card,
  CardActions,
  Menu,
  MenuItem,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import DownloadIcon from '@mui/icons-material/Download'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import PdfThumbnail from '../pdf/PdfThumbnail'
import { MoreHoriz } from '@mui/icons-material'

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
  backgroundColor = '#555555',
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 280,
        height: 180,
        mt: 3,
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

      <div style={{ paddingLeft: '100px', display: 'flex' }}>
        <Box
          onClick={onView}
          sx={{
            flexGrow: 1,
            width: '140px',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          <Typography
            variant='h6'
            sx={{
              color: titleColor,
              fontWeight: 'bold',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
            title={document.title}
          >
            {document.title}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              color: subtitleColor,
              fontWeight: '400',
              mb: 4,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
            title={document.description}
          >
            {document.description}
          </Typography>
          <Box>
            <Typography sx={{ fontSize: 11, color: leftSideColor }}>
              <span style={{ fontWeight: 'bold' }}>{leftSideTitle}:</span>{' '}
              {leftSideValue}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 11, color: rightSideColor }}>
              <span style={{ fontWeight: 'bold' }}>{rightSideTitle}:</span>{' '}
              {rightSideValue}
            </Typography>
          </Box>
        </Box>
        <DocumentActionsDropdown
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      </div>
    </Card>
  )
}

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
}

const DocumentActionsDropdown = ({ onView, onEdit, onDelete, onDownload }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div style={{ marginTop: '-10px' }}>
      <IconButton onClick={handleClick}>
        <MoreHoriz />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            onView()
            handleClose()
          }}
        >
          <Tooltip title='View Document'>
            <IconButton size='small'>
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          View Document
        </MenuItem>
        <MenuItem
          onClick={() => {
            onEdit()
            handleClose()
          }}
        >
          <IconButton size='small'>
            <EditIcon />
          </IconButton>
          Edit Document
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDownload()
            handleClose()
          }}
        >
          <IconButton>
            <DownloadIcon />
          </IconButton>
          Download Document
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete()
            handleClose()
          }}
        >
          <IconButton>
            <DeleteIcon color='error' />
          </IconButton>
          Delete Document
        </MenuItem>
      </Menu>
    </div>
  )
}

export default DocumentCard
