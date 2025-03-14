import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button
} from '@mui/material';
import { Plus } from 'lucide-react';

interface AddressRow {
  id: string;
  name: string;
  address: string;
  residentType: string;
  pincode: string;
  city: string;
  state: string;
}

interface AddressGridProps {
  customerNames: string[];
}

const AddressGrid: React.FC<AddressGridProps> = ({ customerNames }) => {
  const [rows, setRows] = useState<AddressRow[]>([]);

  useEffect(() => {
    // Initialize with one row for each customer
    const initialRows = customerNames.map((name, idx) => ({
      id: `addr-${idx}`,
      name,
      address: '',
      residentType: 'Owned',
      pincode: '',
      city: '',
      state: ''
    }));
    setRows(initialRows);
  }, [customerNames]);

  const addRow = () => {
    const newRow: AddressRow = {
      id: `addr-${Date.now()}`,
      name: customerNames[0] || '',
      address: '',
      residentType: 'Owned',
      pincode: '',
      city: '',
      state: ''
    };
    setRows([...rows, newRow]);
  };

  const updateRow = (id: string, field: keyof AddressRow, value: string) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handlePincodeChange = (id: string, value: string) => {
    if (!/^\d*$/.test(value) || value.length > 6) return;
    updateRow(id, 'pincode', value);
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        border: '1px solid #E5E7EB', 
        borderRadius: '12px', 
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
              <TableCell>Name</TableCell>
              <TableCell>Full Address</TableCell>
              <TableCell>Resident Type</TableCell>
              <TableCell>Pincode</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <FormControl variant="standard" fullWidth>
                    <Select
                      value={row.name}
                      onChange={(e) => updateRow(row.id, 'name', e.target.value as string)}
                    >
                      {customerNames.map(name => (
                        <MenuItem key={name} value={name}>{name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    fullWidth
                    multiline
                    rows={2}
                    value={row.address}
                    onChange={(e) => updateRow(row.id, 'address', e.target.value)}
                    placeholder="Enter full address"
                  />
                </TableCell>
                <TableCell>
                  <FormControl variant="standard" fullWidth>
                    <Select
                      value={row.residentType}
                      onChange={(e) => updateRow(row.id, 'residentType', e.target.value as string)}
                    >
                      <MenuItem value="Owned">Owned</MenuItem>
                      <MenuItem value="Rented">Rented</MenuItem>
                      <MenuItem value="Leased">Leased</MenuItem>
                      <MenuItem value="Family Owned">Family Owned</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={row.pincode}
                    onChange={(e) => handlePincodeChange(row.id, e.target.value)}
                    placeholder="6 digits"
                    inputProps={{ maxLength: 6 }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={row.city}
                    onChange={(e) => updateRow(row.id, 'city', e.target.value)}
                    placeholder="City"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={row.state}
                    onChange={(e) => updateRow(row.id, 'state', e.target.value)}
                    placeholder="State"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box 
        sx={{ 
          padding: '12px', 
          display: 'flex', 
          justifyContent: 'center', 
          borderTop: '1px solid #F3F4F6'
        }}
      >
        <Button
          variant="outlined"
          startIcon={<Plus size={16} />}
          onClick={addRow}
          sx={{ 
            borderColor: '#2563EB',
            color: '#2563EB',
            '&:hover': {
              backgroundColor: '#EBF5FF',
              borderColor: '#2563EB'
            },
            px: 3,
            py: 1
          }}
        >
          Add Address
        </Button>
      </Box>
    </Paper>
  );
};

export default AddressGrid;