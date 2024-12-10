
import { FormControl, FormLabel} from "@chakra-ui/form-control";
import { Input, Select, Textarea } from "@chakra-ui/react";



// eslint-disable-next-line react/prop-types
const CreateEvent= ({home_team, away_team})=> {
    return(
        
         <div>
          <h1>
            {home_team} vs {away_team}
          </h1>
        
           <FormControl>
           <FormLabel>How long will this event run?</FormLabel>
           <Input type='date'/>
            <FormLabel>Description</FormLabel>
            <Textarea type="text"/>
            <FormLabel>Invite friends</FormLabel>
            <Select placeholder='Select Friends'>
            <option value=''>Option 1</option>
            <option value=''>Option 2</option>
            <option value=''>Option 3</option>
            </Select>
           </FormControl>
        </div>
        
    )
}
export default CreateEvent;