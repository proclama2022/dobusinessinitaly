import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicyContent = () => {
  const { t } = useTranslation();
  
  return (
    <div className="prose max-w-none">
      <h2>{t('privacy.title')}</h2>
      <p>{t('privacy.intro')}</p>
      <p>{t('privacy.printInfo')}</p>

      <h3>{t('privacy.summaryTitle')}</h3>
      <p>{t('privacy.summaryText')}</p>

      <h3>{t('privacy.contactTitle')}</h3>
      <p>
        <strong>{t('privacy.owner')}</strong><br />
        {t('privacy.ownerAddress')}<br />
        {t('privacy.ownerEmail')}
      </p>

      <h3>{t('privacy.fullPolicyTitle')}</h3>
      
      <h4>{t('privacy.dataTypesTitle')}</h4>
      <p>{t('privacy.dataTypesText')}</p>
      
      <h4>{t('privacy.ownerTitle')}</h4>
      <p dangerouslySetInnerHTML={{ __html: t('privacy.ownerDetails') }} />

      <h4>{t('privacy.dataTypesCollectedTitle')}</h4>
      <p>{t('privacy.dataTypesCollectedText1')}</p>
      <p>{t('privacy.dataTypesCollectedText2')}</p>
      <p>{t('privacy.dataTypesCollectedText3')}</p>
      <p>{t('privacy.dataTypesCollectedText4')}</p>

      <h4>{t('privacy.processingMethodTitle')}</h4>
      <p>
        <strong>{t('privacy.processingMethodSubtitle')}</strong><br />
        {t('privacy.processingMethodText')}
      </p>
      <p>
        <strong>{t('privacy.locationTitle')}</strong><br />
        {t('privacy.locationText1')}<br />
        {t('privacy.locationText2')}
      </p>
      <p>
        <strong>{t('privacy.retentionPeriodTitle')}</strong><br />
        {t('privacy.retentionPeriodText')}
      </p>

      <h4>{t('privacy.purposeTitle')}</h4>
      <p>{t('privacy.purposeText1')}</p>
      <p>{t('privacy.purposeText2')}</p>

      <h4>{t('privacy.detailsTitle')}</h4>
      <p>{t('privacy.detailsText')}</p>

      <h4>{t('privacy.additionalInfoTitle')}</h4>
      <p>
        <strong>{t('privacy.legalBasisTitle')}</strong><br />
        {t('privacy.legalBasisText')}
      </p>
      <ul>
        <li>{t('privacy.legalBasisPoint1')}</li>
        <li>{t('privacy.legalBasisPoint2')}</li>
        <li>{t('privacy.legalBasisPoint3')}</li>
        <li>{t('privacy.legalBasisPoint4')}</li>
        <li>{t('privacy.legalBasisPoint5')}</li>
      </ul>
      <p>{t('privacy.clarificationText')}</p>

      <p>
        <strong>{t('privacy.retentionTitle')}</strong><br />
        {t('privacy.retentionText')}
      </p>
      <p>{t('privacy.retentionExamplesTitle')}</p>
      <ul>
        <li>{t('privacy.retentionExample1')}</li>
        <li>{t('privacy.retentionExample2')}</li>
      </ul>
      <p>{t('privacy.retentionConsentText')}</p>

      <p>
        <strong>{t('privacy.rightsTitle')}</strong><br />
        {t('privacy.rightsText')}
      </p>
      <p>{t('privacy.rightsIntro')}</p>
      <ul>
        <li>{t('privacy.rightsPoint1')}</li>
        <li>{t('privacy.rightsPoint2')}</li>
        <li>{t('privacy.rightsPoint3')}</li>
        <li>{t('privacy.rightsPoint4')}</li>
        <li>{t('privacy.rightsPoint5')}</li>
        <li>{t('privacy.rightsPoint6')}</li>
        <li>{t('privacy.rightsPoint7')}</li>
        <li>{t('privacy.rightsPoint8')}</li>
      </ul>
      <p>{t('privacy.rightsTransferInfo')}</p>

      <p>
        <strong>{t('privacy.oppositionTitle')}</strong><br />
        {t('privacy.oppositionText1')}<br />
        {t('privacy.oppositionText2')}
      </p>

      <p>
        <strong>{t('privacy.exerciseTitle')}</strong><br />
        {t('privacy.exerciseText')}
      </p>

      <h4>{t('privacy.additionalProcessingTitle')}</h4>
      <p>
        <strong>{t('privacy.legalDefenseTitle')}</strong><br />
        {t('privacy.legalDefenseText1')}<br />
        {t('privacy.legalDefenseText2')}
      </p>
      <p>
        <strong>{t('privacy.specificInfoTitle')}</strong><br />
        {t('privacy.specificInfoText')}
      </p>
      <p>
        <strong>{t('privacy.systemLogsTitle')}</strong><br />
        {t('privacy.systemLogsText')}
      </p>
      <p>
        <strong>{t('privacy.missingInfoTitle')}</strong><br />
        {t('privacy.missingInfoText')}
      </p>
      <p>
        <strong>{t('privacy.changesTitle')}</strong><br />
        {t('privacy.changesText')}
      </p>

      <h4>{t('privacy.definitionsTitle')}</h4>
      <p>
        <strong>{t('privacy.personalDataTitle')}</strong><br />
        {t('privacy.personalDataText')}
      </p>
      <p>
        <strong>{t('privacy.usageDataTitle')}</strong><br />
        {t('privacy.usageDataText')}
      </p>
      <p>
        <strong>{t('privacy.userTitle')}</strong><br />
        {t('privacy.userText')}
      </p>
      <p>
        <strong>{t('privacy.dataSubjectTitle')}</strong><br />
        {t('privacy.dataSubjectText')}
      </p>
      <p>
        <strong>{t('privacy.processorTitle')}</strong><br />
        {t('privacy.processorText')}
      </p>
      <p>
        <strong>{t('privacy.controllerTitle')}</strong><br />
        {t('privacy.controllerText')}
      </p>
      <p>
        <strong>{t('privacy.applicationTitle')}</strong><br />
        {t('privacy.applicationText')}
      </p>
      <p>
        <strong>{t('privacy.serviceTitle')}</strong><br />
        {t('privacy.serviceText')}
      </p>
      <p>
        <strong>{t('privacy.euTitle')}</strong><br />
        {t('privacy.euText')}
      </p>
      <p>
        <strong>{t('privacy.legalReferencesTitle')}</strong><br />
        {t('privacy.legalReferencesText1')}<br />
        {t('privacy.legalReferencesText2')}<br />
        {t('privacy.legalReferencesText3')}
      </p>
    </div>
  );
};

export default PrivacyPolicyContent;
