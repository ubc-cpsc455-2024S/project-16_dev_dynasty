import { createAsyncThunk } from '@reduxjs/toolkit';
import LogService from './serviceLog';


const actionTypes = {
    
    GETALL: 'logs/all',
    
}


export const getEventLogsAsync = createAsyncThunk(
    actionTypes.GETALL,
    async () => {
        return await LogService.getAllLogs();
    });