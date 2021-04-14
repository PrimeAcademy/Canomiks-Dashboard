import { DialogContent, DialogContentText } from '@material-ui/core';

function CustomerDetail({ sample }) {
  return (
    <DialogContent>
      <DialogContentText>
        <h2>Lot # {sample.lotNumber}</h2>
        <h3>{sample.ingredientName}</h3>

        <div>
          <p>
            Amount: {sample.ingredientAmount} {sample.ingredientUnit}
          </p>
          <p>Format: {sample.format}</p>
          <p>Purity: {sample.purity}</p>
          <p>Strain: {sample.cropStrain}</p>
        </div>

        <div>
          <p>Manufacture Date: {sample.dateManufactured}</p>
          <p>Extraction Method: {sample.extractionMethod}</p>
          <p>
            Growth Region: {sample.city}, {sample.state}, {sample.country}
          </p>
          <p>Harvest Date: {sample.harvestDate}</p>
          <p>Sustainability: {sample.sustainabilityInfo}</p>
        </div>
      </DialogContentText>
    </DialogContent>
  );
}

export default CustomerDetail;
