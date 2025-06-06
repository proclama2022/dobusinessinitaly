import { Router } from "express";
import { processForm } from "./services/formProcessor";
import { generateArticleTranslations } from "./services/translationService";
import { authenticate } from "./middleware/auth";

const router = Router();

/**
 * Endpoint per l'elaborazione dei moduli con AI
 * @route POST /api/form/process
 * @access Private
 */
router.post("/process", authenticate, async (req, res) => {
  try {
    const { formData, language } = req.body;
    
    // Processa il modulo con AI
    const processedForm = await processForm(formData);
    
    res.status(200).json({
      success: true,
      data: processedForm
    });
  } catch (error: any) {
    console.error("Errore nell'elaborazione del modulo:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Errore interno del server"
    });
  }
});

router.post("/translate-article", authenticate, async (req, res) => {
  try {
    const { originalFilePath, targetLanguages } = req.body;
    if (!originalFilePath || !targetLanguages || !Array.isArray(targetLanguages)) {
      return res.status(400).json({
        success: false,
        message: "originalFilePath and targetLanguages (array) are required"
      });
    }

    await generateArticleTranslations(originalFilePath, targetLanguages);

    res.status(200).json({
      success: true,
      message: "Translations generated successfully"
    });
  } catch (error: any) {
    console.error("Error generating translations:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
});

export default router;
