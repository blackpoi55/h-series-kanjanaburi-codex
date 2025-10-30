export const renderHealthSummary = (p, sections = []) => {
    const result = [];

    if (sections.includes("cbc")) {
        const cbcFields = [
            "cbc_hb_summary",
            "cbc_hct_summary",
            "cbc_wbc_summary",
            "cbc_eosinophil_summary",
            "cbc_platelet_count_summary",
            "cbc"
        ];

        const cbcContent = cbcFields
            .map((field, i) => {
                const val = p?.[field];
                if (val && val !== "-") {
                    return (
                        <label key={`cbc-${i}`} className="font-semibold w-full">
                            {val}<br />
                        </label>
                    );
                }
                return null;
            })
            .filter(Boolean);

        if (cbcContent.length > 0) {
            result.push(
                <div key="cbc-section" className="pt-1 w-full">
                    {cbcContent}
                </div>
            );
        }
    }
    if (sections.includes("diabetes")) {
        const diabetesFields = ["fbs_detail", "hba1c_detail"];

        const diabetesContent = diabetesFields
            .map((field, i) => {
                const val = p?.[field];
                if (val && val !== "-") {
                    return (
                        <label key={`diabetes-${i}`} className="font-semibold w-full">
                            {val}<br />
                        </label>
                    );
                }
                return null;
            })
            .filter(Boolean);

        if (diabetesContent.length > 0) {
            result.push(
                <div key="diabetes-section" className="pt-1 w-full">
                    {diabetesContent}
                </div>
            );
        }
    }
    if (sections.includes("kidney")) {
        const kidneyFields = [
            "bun_detail",
            "creatinine_detail",
            "egfr_detail",
            "kidney_summary"
        ];

        const kidneyContent = kidneyFields
            .map((field, i) => {
                const val = p?.[field];
                if (val && val !== "-") {
                    return (
                        <label key={`kidney-${i}`} className="font-semibold w-full">
                            {val}<br />
                        </label>
                    );
                }
                return null;
            })
            .filter(Boolean);

        if (kidneyContent.length > 0) {
            result.push(
                <div key="kidney-section" className="pt-1 w-full">
                    {kidneyContent}
                </div>
            );
        }
    }
    if (sections.includes("liver")) {
        const liverFields = [
            "sgot_detail",
            "sgpt_detail",
            "alkaline_phosphatase_detail",
            "liver1"
        ];

        const liverContent = liverFields
            .map((field, i) => {
                const val = p?.[field];
                if (val && val !== "-") {
                    return (
                        <label
                            key={`liver-${i}`}
                            className="font-semibold w-full"
                            onClick={field === "liver1" ? () => console.log(p) : undefined}
                        >
                            {val}<br />
                        </label>
                    );
                }
                return null;
            })
            .filter(Boolean);

        if (liverContent.length > 0) {
            result.push(
                <div key="liver-section" className="pt-1 w-full">
                    {liverContent}
                </div>
            );
        }
    }
    if (sections.includes("lipid")) {
        const lipidFields = [
            "chol_detail",
            "trig_detail",
            "hdl_detail",
            "ldl_detail",
            "lipid"
        ];

        const lipidContent = lipidFields
            .map((field, i) => {
                const val = p?.[field];
                if (val && val !== "-") {
                    return (
                        <label key={`lipid-${i}`} className="font-semibold w-full">
                            {val}<br />
                        </label>
                    );
                }
                return null;
            })
            .filter(Boolean);

        if (lipidContent.length > 0) {
            result.push(
                <div key="lipid-section" className="pt-1 w-full">
                    {lipidContent}
                </div>
            );
        }
    }
    if (sections.includes("uric")) {
        const uricFields = [
            "uric_detail"
        ];

        const uricContent = uricFields
            .map((field, i) => {
                const val = p?.[field];
                if (val && val !== "-") {
                    return (
                        <label key={`uric-${i}`} className="font-semibold w-full">
                            {val}<br />
                        </label>
                    );
                }
                return null;
            })
            .filter(Boolean);

        if (uricContent.length > 0) {
            result.push(
                <div key="uric-section" className="pt-1 w-full">
                    {uricContent}
                </div>
            );
        }
    }
    if (sections.includes("ua")) {
        const uaFields = [
            "ua_summary"
        ];

        const uaContent = uaFields
            .map((field, i) => {
                const val = p?.[field];
                if (val && val !== "-") {
                    return (
                        <label key={`ua-${i}`} className="font-semibold w-full">
                            {val}<br />
                        </label>
                    );
                }
                return null;
            })
            .filter(Boolean);

        if (uaContent.length > 0) {
            result.push(
                <div key="ua-section" className="pt-1 w-full">
                    {uaContent}
                </div>
            );
        }
    }
    if (sections.includes("all")) {
        const allFields = [
            "bmi_interpretation",
            "physical_exam_summary",
            "cbc",
            "ua_summary - ผลตรวจปัสสาวะปกติ",
            "stool_exam_detail",
            "fbs_detail",
            "hba1c_detail",
            "lipid",
            "uric_detail",
            "kidney_summary",
            "liver1",
            "thyroid_detection_detail",
        ];

        const allContent = allFields
            .map((field, i) => {
                const val = p?.[field];
                if (val && val !== "-") {
                    return (
                        <label key={`all-${i}`} className="font-semibold w-full">
                            {val}<br />
                        </label>
                    );
                }
                return null;
            })
            .filter(Boolean);

        if (allContent.length > 0) {
            result.push(
                <div key="all-section" className="pt-1 w-full">
                    {allContent}
                </div>
            );
        }
    } 
    return result;
};