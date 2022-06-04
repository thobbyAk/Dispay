import * as React from 'react'
import Step1 from '@/components/forms/createGroup/Step1'
import FormCard from '@/components/forms/createGroup/FormCard'
import Step2 from '@/components/forms/createGroup/Step2'
import Step3 from '@/components/forms/createGroup/Step3'
import Step4 from '@/components/forms/createGroup/Step4'
import { useForm, FormProvider } from 'react-hook-form'
import { tokenList } from '@/services/utils/tokenList'
function CreateGroup() {

  console.log(tokenList[0])
  const methods = useForm({
    defaultValues: {
      depositEndDate: new Date(),
      token: tokenList[0],
    },
  })

  const [formStep, setFormStep] = React.useState(0)

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1)

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1)

  return (
    <>
      <FormProvider {...methods}>
        <FormCard formStep={formStep}>
          {formStep === 0 && <Step1 nextFormStep={nextFormStep} />}
          {formStep === 1 && (
            <Step2
              nextFormStep={nextFormStep}
              prevFormStep={prevFormStep}
              tokens={tokenList}
            />
          )}
          {formStep === 2 && (
            <Step3 nextFormStep={nextFormStep} prevFormStep={prevFormStep} />
          )}
          {formStep === 3 && (
            <Step4 nextFormStep={nextFormStep} prevFormStep={prevFormStep} />
          )}
        </FormCard>
      </FormProvider>
    </>
  )
}

export default CreateGroup
