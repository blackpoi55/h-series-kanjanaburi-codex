'use client'
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

function NoteModal({ name, open, onClose, noteText }) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: 500,
                    maxHeight: '80vh',
                    bgcolor: '#fffde7',
                    boxShadow: 24,
                    p: 0,
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2,
                    py: 1,
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#fffde7',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: '#ff4b4b'
                        }} />
                        <Typography variant="subtitle1" fontWeight="bold" color="#2b3b52">
                            {name || 'Note'}
                        </Typography>
                    </Box>
                    <IconButton size="small" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Content (Note area) */}
                <Box sx={{
                    px: 3,
                    py: 2,
                    background: 'repeating-linear-gradient(#fffde7, #fffde7 24px, #f0f0d6 25px)',
                    fontFamily: 'monospace',
                    fontSize: '0.95rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflowY: 'auto',
                    maxHeight: '60vh',
                    minHeight: '200px',
                    color: '#333333', // ✅ เพิ่มบรรทัดนี้เพื่อเปลี่ยนสีข้อความ
                }}>
                    {noteText || '-'}
                </Box>
            </Box>
        </Modal>
    );
}

export default NoteModal;
